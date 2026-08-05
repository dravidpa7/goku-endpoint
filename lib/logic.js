function LongestStreak(data){

    let count = 0
    let max_count = 0
    data.days.forEach(day =>{
        if(day.contributionCount > 0){
            count = count+1
        }
        else{
            max_count = Math.max(count,max_count)
            count = 0
        }
    })
    let day_count = Math.max(max_count,count)

    return {
        day_count
    }
}

export {LongestStreak}