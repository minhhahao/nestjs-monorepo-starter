-- Add refresh token column to User table
ALTER TABLE "User" ADD COLUMN "refreshToken" text;
