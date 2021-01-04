export const verifyTokenQuery = `
query verifyToken($permissions: [String!]!){
      verifyToken(permissions: $permissions)
}`;
