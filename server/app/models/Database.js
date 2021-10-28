const db = require('../configs/db')

class Database {
    constructor(name) {
        this.name = name
        return this
    }
    all() {
        return new Promise((res, rej) => {
            db.query(`SELECT * from ${this.name}`, (err, data) => {
                if (err) rej(err)
                else res(data)
            })
        })
    }
    row(where) {
        var w = ''
        for (var i in where) {
            w += i + "='" + where[i] + "' AND "
        }
        w = w.slice(0, -4)

        return new Promise((res, rej) => {
            db.query(`SELECT * from ${this.name} WHERE ${w}`, (err, data) => {
                if (err) rej(err)
                else res(data)
            })
        })
    }
    add(data) {

        var key = ''
        var value = ''

        for (var i in data) {
            key += i + ','
            value += "'" + data[i] + "',"
        }

        key = key.slice(0, -1)
        value = value.slice(0, -1)

        db.query(`INSERT INTO ${this.name} (${key}) values (${value})`, err => {
            if (err) console.log(err)
        })
    }
    edit(where, data) {
        var w = ''
        for (var i in where) {
            w += i + "='" + where[i] + "' AND "
        }
        w = w.slice(0, -4)
        var up = ''
        for (var i in data) {
            up += i + "='" + data[i] + "',"
        }
        up = up.slice(0, -1)

        db.query(`UPDATE ${this.name} SET ${up} WHERE ${w}`, err => {
            if (err) console.log(err)
        })
    }
}

module.exports = Database