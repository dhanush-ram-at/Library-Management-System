// request DTO — shapes the incoming register body
const toRegisterInput = (body) => ({
  name:     body.name,
  email:    body.email,
  password: body.password,
  role:     body.role || "MEMBER",   // default role is MEMBER
});

// response DTO — strips password before sending user back
// we never send password back to frontend
const formatUser = (user) => ({
  id:         user.id,
  name:       user.name,
  email:      user.email,
  role:       user.role,
  created_at: user.created_at,
});

module.exports = { toRegisterInput, formatUser };