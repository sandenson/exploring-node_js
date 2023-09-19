const express = require("express");
const Registry = require("../lib/Registry");

const router = express.Router();

const registry = new Registry()

function getRequestArguments(req) {
    const { name, version, port } = req.params
    let { ip } = req

    if (/::(?:1|ffff:127\.0\.0\.1)/.test(ip)) {
        ip = '127.0.0.1'
    }

    return { name, version, port, ip }
}

router.get('/find/:name/:version', (req, res, next) => {
    const { name, version } = getRequestArguments(req)

    const service = registry.get(name, version)

    if (!service) {
        return res.status(404).json({ error: 'No matching service found' })
    }

    return res.json(service)
})

router.put('/register/:name/:version/:port', (req, res) => {
    const { name, version, ip, port } = getRequestArguments(req)

    const key = registry.register(name, version, ip, port)

    return res.json({ result: key })
})

router.delete('/register/:name/:version/:port', (req, res) => {
    const { name, version, ip, port } = getRequestArguments(req)

    const key = registry.unregister(name, version, ip, port)

    return res.json({ result: key })
})

module.exports = router;
