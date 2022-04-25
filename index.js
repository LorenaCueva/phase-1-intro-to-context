function createEmployeeRecord(record){
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(records){
    return records.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(record, date){
    const d = date.split(' ')
    record.timeInEvents.push({type: "TimeIn", hour: parseInt(d[1],10), date: d[0]})
    return record
}

function createTimeOutEvent(record, date){
    const d = date.split(' ')
    record.timeOutEvents.push({type: "TimeOut", hour: parseInt(d[1],10), date: d[0]})
    return record
}


function hoursWorkedOnDate(record, onDate){
    const timeIn = record.timeInEvents.find(e => e.date === onDate)
    const timeOut = record.timeOutEvents.find(e => e.date === onDate)
    return parseInt((timeOut.hour - timeIn.hour) / 100, 10)
}

function wagesEarnedOnDate(record, onDate){
    return parseInt(hoursWorkedOnDate(record, onDate) * record.payPerHour, 10)
}

function allWagesFor(record){
    let dates = record.timeInEvents.map(e => e.date)
    let wages = dates.map(d => wagesEarnedOnDate(record, d))
    return addUp(wages)
}

function calculatePayroll(employees){
    return addUp(employees.map(e => allWagesFor(e)))
}

function addUp(arr){
    return parseInt(arr.reduce((total, current) => total + current, 0), 10)
}

// const rec = createEmployeeRecord(["Lorena", "Cueva", "Lic", 65])
// const records = createEmployeeRecords([["Lorena", "Cueva", "Lic", 10],["Aki", "LePouf", "Potato Sack" , 10]])
// createTimeInEvent(records[0],"2022-04-25 1300")
// createTimeOutEvent(records[0],"2022-04-25 1500")
// createTimeInEvent(records[0],"2022-04-26 1400")
// createTimeOutEvent(records[0],"2022-04-26 1500")
// createTimeInEvent(records[1],"2022-04-25 1300")
// createTimeOutEvent(records[1],"2022-04-25 1500")
// createTimeInEvent(records[1],"2022-04-26 1400")
// createTimeOutEvent(records[1],"2022-04-26 1500")
// console.log(calculatePayroll(records))
// console.log(records)
// console.log(records[0].timeInEvents)
// console.log(hoursWorkedOnDate(rec,"2022-04-25"))
// console.log(wagesEarnedOnDate(rec,"2022-04-25"))
// allWagesFor(rec)
// console.log(rec)



// console.log(createEmployeeRecords([["Lorena", "Cueva", "Lic", 65],["Aki", "LePouf", "Potato Sack" , 100]]))