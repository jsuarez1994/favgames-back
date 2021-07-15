interface IGame {
    id: number;
    name: string;
    platforms: IPlatform[];
    rating: number;
    release_dates: IReleaseDate[];
    screenshots: IScreenshot[];
    summary: string;
}
  
interface IPlatform {
    id: number;
    name: string;
}

interface IReleaseDate {
    id: number;
    human: string;
}

interface IScreenshot {
    id: number;
    url: string;
}