import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import sendEmail from '../utils/sendEmail.js'; // Utility function for sending emails

// Forgot password function
export const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;

		// Check if user exists
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ error: "No user with this email address" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString('hex');
		user.resetPasswordToken = resetToken;
		user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
		await user.save();

		// Send email with reset token
		const resetUrl = `http://localhost:5000/api/auth/reset-password/${resetToken}`;
		const message = `You are receiving this email because you requested to reset the password for your account. Please make a PUT request to: \n\n ${resetUrl}`;
		await sendEmail({
			email: user.email,
			subject: 'Password Reset Token',
			message,
		});

		res.status(200).json({ message: 'Reset password token sent to email' });
	} catch (error) {
		console.error("Error in forgotPassword controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Reset password function
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        // Find user by reset token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: "Password reset token is invalid or has expired" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Hash new password and save
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error("Error in resetPassword controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
