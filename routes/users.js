const router = require('express').Router();
const {
  getUsers,
  getProfile,
  createUser,
  patchProfile,
  patchAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:_id', getProfile);
router.post('/', createUser);
router.patch('/me', patchProfile);
router.patch('/me/avatar', patchAvatar);

module.exports = router;
