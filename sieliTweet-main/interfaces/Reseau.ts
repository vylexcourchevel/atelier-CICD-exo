/* V1
interface Todo {
email: string,
password: string,
}*/

// V2 
export interface Reseaux {
_id: number;
token: string,
}


export type RootState = {
  todo: {
    data: Reseaux[]
  }
}

export type TweetType = {
  id_user: string,
  contenu: string
}