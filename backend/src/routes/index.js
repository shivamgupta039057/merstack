//routes declaration
const prefix = '/api/v1'

module.exports = (app) => {
app.use(`${prefix}/image`, require("./images.routes"))
app.use(`${prefix}/users`, require("./user.routes"))
app.use(`${prefix}/pratice`, require("./practice.routes"))
app.use(`${prefix}/product`, require("./product.routes"))
}