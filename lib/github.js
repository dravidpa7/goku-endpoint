
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
    if(!token) throw new Error("Missing GITHUB_TOKEN env var");

    const res = await fetch("https://api.github.com/graphql", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/vnd.github+json",
            "User-Agent":"goku-contribution-count",
            "X-GitHub-Api-Version":"2022-11-28",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            query: QUERY,
            variables: {userName: name}
        }),
    })

    const responseText = await res.text();
    if(!res.ok) {
        throw new Error(`Github API Error : ${res.status} ${responseText}`)
    }

    const json = JSON.parse(responseText);

    const calendar = json.data.user.contributionsCollection.contributionCalendar;

    const days = calendar.weeks.flatMap((w)=> w.contributionDays)

    return {
        total: calendar.totalContributions,
        days,
    };
}

export default fetchContributions   