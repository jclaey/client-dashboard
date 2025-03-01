import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../../models/User.js'

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user || !(await user.comparePasswords(password))) {
            res.status(401)
            throw new Error('Invalid credentials')
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET, 
            { expiresIn: '15m' }
        )

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        )

        user.jwtRefreshToken = refreshToken
        await user.save()

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        console.log("✅ Login successful, refresh token set:", refreshToken)

        res.status(200).json({ 
            message: "Login successful", 
            accessToken 
        })

    } catch (err) {
        next(err)
    }
}

export const register = async (req, res, next) => {
    try {
      if (
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.password ||
        !req.body.confirmPassword ||
        !req.body.email
      ) {
        res.status(400)
        throw new Error('Please provide all required fields')
      }
  
      const { firstName, lastName, password, confirmPassword, email } = req.body
  
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        res.status(409)
        throw new Error('Email is already in use')
      }
  
      if (password !== confirmPassword) {
        res.status(400)
        throw new Error('Passwords do not match')
      }
  
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
  
      let user = await User.create({
        firstName,
        lastName,
        password: hashedPassword,
        email,
      })
  
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      )
  
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
      )
  
      user.jwtRefreshToken = refreshToken;
      await user.save()
  
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
  
      res.status(201).json({
        _id: user._id,
        firstName,
        lastName,
        email,
        accessToken,
        message: 'Registration successful'
      })
    } catch (err) {
      next(err)
    }
}

export const refreshAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken
        if (!refreshToken) {
            console.warn("❌ No refresh token found in request cookies.")
            res.status(401)
            throw new Error('Unauthorized - No refresh token')
        }

        let decoded
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)
        } catch (error) {
            console.error("❌ Expired or invalid refresh token:", error.message)
            res.status(401)
            throw new Error('Refresh token expired. Please log in again.')
        }

        const user = await User.findById(decoded.userId)
        if (!user) {
            console.error("❌ No user found for the provided refresh token.")
            res.status(403)
            throw new Error('Invalid refresh token')
        }
    
        if (user.jwtRefreshToken !== refreshToken) {
            console.error("❌ Refresh token mismatch in database.")
            // Optionally clear the stored token:
            user.jwtRefreshToken = null
            await user.save()
            res.status(403)
            throw new Error('Invalid refresh token')
        }

        const newAccessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )

        res.status(200).json({ accessToken: newAccessToken })

    } catch (err) {
        next(err)
    }
}

export const logout = async (req, res, next) => {
    try {
        console.log("🔹 Received logout request...")

        const refreshToken = req.cookies?.refreshToken
        if (!refreshToken) {
            console.warn("❌ No refresh token found in cookies before logout.")
            res.status(400)
            throw new Error('No refresh token found')
        }

        console.log("🔹 Refresh Token Found:", refreshToken)

        let decoded
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)
        } catch (error) {
            console.error("❌ Invalid or expired refresh token during logout:", error.message)
            res.status(403)
            throw new Error('Invalid or expired refresh token')
        }

        const user = await User.findById(decoded.userId)
        if (!user) {
            console.warn("❌ No user found for the provided refresh token.")
            res.status(403)
            throw new Error('Invalid refresh token')
        }

        user.jwtRefreshToken = null
        await user.save()
        console.log("✅ Refresh token removed from database")

        res.cookie("refreshToken", "", {
            httpOnly: true,
            sameSite: "Lax",
            secure: false,
            expires: new Date(0),
            maxAge: -1,
        })

        console.log("✅ Logout successful")
        return res.status(200).json({ message: "Logout successful" })

    } catch (err) {
        next(err)
    }
}