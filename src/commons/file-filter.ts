import { BadRequestException } from '@nestjs/common';

export const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/svg' ||
    file.mimetype === 'image/PNG' ||
    file.mimetype === 'image/JPG' ||
    file.mimetype === 'image/JPEG' ||
    file.mimetype === 'image/SVG'
  ) {
    return cb(null, true);
  }
  return cb(
    new BadRequestException('Only .png, .jpg, .jpeg and .svg format allowed'),
    false,
  );
};
