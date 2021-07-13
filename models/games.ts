interface Games {
    id: number;
    name: string;
    platforms: Common[];
    rating: number;
    release_dates: Common[];
    screenshots: Common[];
    summary: string;
}
  
interface Common {
    id: number;
    value: string;
}