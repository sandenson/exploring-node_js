const axios = require('axios')
const config = require('../config')

function handleAxiosError(error) {
    const errorMessage = (error.response && error.response.data && error.response.data.message) || error.message
    return new Error(errorMessage)
}

class ServiceClient {
    static async getService(name) {
        try {
            const { version } = config.registry
            const response = await axios.get(`${config.registry.url}/find/${name}/${version}`)

            if (!response.data.ip) {
                throw new Error(`Could not find ${name}:${version}`)
            }

            return response.data
        } catch (err) {
            throw handleAxiosError(err)
        }
    }

    static async callService(name, requestOptions) {
        const { ip, port } = await this.getService(name)

        // eslint-disable-next-line no-param-reassign
        requestOptions.url = `http://${ip}:${port}${requestOptions.url}`

        try {
            const response = await axios(requestOptions)

            return response.data
        } catch (err) {
            throw handleAxiosError(err)
        }
    }
}

module.exports = ServiceClient
