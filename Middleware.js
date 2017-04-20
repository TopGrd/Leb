/**
 * Class Middleware
 * description 中间件
 */
class Middleware {
	constructor() {
		this.cache = []
		this.options = null
	}

	use(fn) {
		if (typeof fn !== "function") {
			throw new Error("Middleware is must be a function! ")
		}

		this.cache.push(fn)
		return this
	}

	next() {
		if (this.middlewares && this.middlewares.length > 0) {
			this.current = this.middlewares.shift()
			this.current.call(this, this.options, this.next.bind(this))
		}
	}

	run(options) {
		this.middlewares = this.cache.map(fn => {
			return fn
		})

		this.options = options
		this.next()
	}
}

var app = new Middleware()
app.use((options, next) => {
	console.log("1")
	next()
})

app.use((options, next) => {
	console.log(options.name)
	next()
})

app.use((options, next) => {
	console.log(options.age)
	next()
})

app.run({
	name: "like",
	age: "fuck"
})
