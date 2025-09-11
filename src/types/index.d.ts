
declare namespace GitHub {
  export interface RepoOwner { login: string; location?: string | null; }
  export interface Repo { full_name: string; stargazers_count: number; html_url: string; owner: RepoOwner; }
  export interface SearchResponse { items: Repo[]; }
}

declare namespace Weather {
  export interface Main { temp: number; }
  export interface WeatherEntry { description: string; }
  export interface Response { main: Main; weather: WeatherEntry[]; }
}

declare namespace News {
  export interface Article { title: string; url: string; source: { name: string }; }
  export interface Response { articles: Article[]; }
}
