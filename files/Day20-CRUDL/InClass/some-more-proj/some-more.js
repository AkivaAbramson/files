// Receives an unknown parameters count and returns the maximum
function myMax() {
    var max = -Infinity
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) max = arguments[i]
    }
    return max
}
console.log('EXPECTED: -Infinity', myMax())
console.log('EXPECTED: 0', myMax(0, 0))
console.log('EXPECTED: 11', myMax(9, 11, 7, 1))

function calcAvg() {
    for (var i = 0, sum = 0, n = arguments.length; i < n; i++) {
        sum += arguments[i]
    }
    return sum / n
}

var now = new Date()
var myBirthday = new Date()
var inOneWeek = new Date()

myBirthday.setFullYear(now.getFullYear(), 8, 24)
inOneWeek.setDate(now.getDate() + 5)

if (now > myBirthday) {
    alert('After Birthday')
} else if (inOneWeek > myBirthday) {
    alert('Get Ready, birthday in 5 days')
} else {
    alert('Before Birthday')
}
