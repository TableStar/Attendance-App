date = new Date().toLocaleDateString("af-ZA")
time = new Date().toLocaleTimeString("id").replaceAll(".", ":")
console.log(date, time);


date1 = new Date(`${new Date().toLocaleDateString("af-ZA")} 07:12:02`)
date2 = new Date("2023-11-23 15:12:04")

console.log(date1)
let clockOut = "2023-11-22T10:02:34.000Z"
console.log(new Date(clockOut));
console.log(new Date());
console.log(new Date(clockOut) < new Date(`${new Date().toLocaleDateString("af-ZA")} 17:00`));

console.log(new Date(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate() - 7} 00:00:00`));