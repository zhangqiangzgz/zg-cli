import axios from 'axios'

const organization = 'zg-cli'
export async function fetchOrganizationRepos() {
  const { data = [] } = await axios.get(`https://api.github.com/orgs/${organization}/repos`)
  return data.map((project: any) => project.name)
}

export async function fetchOrganizationRepoTags(repo: string) {
  const { data = [] } = await axios.get(`https://api.github.com/orgs/${organization}/${repo}/tags`)
  return data.map((tag: any) => tag.name)
}
