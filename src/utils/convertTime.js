let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]
export const convertTime = (mil) => {
    const date = new Date(mil)
    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
}