
const QUERY = `
query($userName: String!) {
  user(login: $userName) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
`


async function fetchContributions(name){
    const token = process.env.GITHUB_TOKEN;
    if(!token) throw new Error (" Missing GITHUB_TOKEN env Var");

    const res = await fetch("https://api.github.com/graphql", {
        method:"POST",
        headers:{
            "Content-type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            query: QUERY,
            variables: {userName: name}
        }),
    })

    if(!res.ok) {
        throw new Error (`Github API Error : ${res.status} ${await res.text}`)
    }

    const json = await res.json();

    const calendar = json.data.user.contributionsCollection.contributionCalendar;

    const days = calendar.weeks.flatMap((w)=> w.contributionDays)

    return {
        total: calendar.totalContributions,
        days,
    };
}

export default fetchContributions   