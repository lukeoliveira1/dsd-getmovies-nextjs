import Image from "next/image";
import Logo from "/public/popcorn-logo.svg";
import { GetServerSidePropsContext } from "next";
import { movieAPI } from "@/services/movieAPI";

interface MoviePage {
  movie: {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: {
      Source: string;
      Value: string;
    }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
  } | null;
  slug: string;
}

export default function MoviePage({ movie, slug }: MoviePage) {
  return (
    <main className="bg-gradient-to-r from-red-800 to-red-600 flex flex-col p-[70px]">
      <a href="/" className="flex items-center gap-4 drop-shadow-lg">
        <Image src={Logo} width={60} height={60} alt="logo" />
        <h1 className="uppercase text-[31px] text-white font-bold">
          GetMovies
        </h1>
      </a>

      {movie ? (
        <div className="bg-white w-full h-full mt-[50px] p-[20px] flex flex-row items-center">
          <div>
            <h1 className="text-2xl font-bold text-center">{movie.Title}</h1>

            <div className="w-[499px] h-[549px] relative border border-stone-400 flex flex-col items-center justify-center mt-4">
              <Image
                src={movie.Poster}
                width={300}
                height={450}
                objectFit="contain"
                alt={movie.Title}
              />
            </div>

            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold">Avaliações:</h2>
              {movie.Ratings.map((rating, index) => (
                <p key={index}>
                  <strong>{rating.Source}:</strong> {rating.Value}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-6 text-lg p-[20px]">
            <p>
              <strong>Ano:</strong> {movie.Year}
            </p>
            <p>
              <strong>Classificação:</strong> {movie.Rated}
            </p>
            <p>
              <strong>Lançamento:</strong> {movie.Released}
            </p>
            <p>
              <strong>Duração:</strong> {movie.Runtime}
            </p>
            <p>
              <strong>Gênero:</strong> {movie.Genre}
            </p>
            <p>
              <strong>Diretor:</strong> {movie.Director}
            </p>
            <p>
              <strong>Roteirista:</strong> {movie.Writer}
            </p>
            <p>
              <strong>Atores:</strong> {movie.Actors}
            </p>
            <p>
              <strong>Sinopse:</strong> {movie.Plot}
            </p>
            <p>
              <strong>Idioma:</strong> {movie.Language}
            </p>
            <p>
              <strong>País:</strong> {movie.Country}
            </p>
            <p>
              <strong>Prêmios:</strong> {movie.Awards}
            </p>
            <p>
              <strong>Metascore:</strong> {movie.Metascore}
            </p>
            <p>
              <strong>Nota IMDb:</strong> {movie.imdbRating}
            </p>
            <p>
              <strong>Votos IMDb:</strong> {movie.imdbVotes}
            </p>
            <p>
              <strong>ID IMDb:</strong> {movie.imdbID}
            </p>
            <p>
              <strong>Tipo:</strong> {movie.Type}
            </p>
            <p>
              <strong>DVD:</strong> {movie.DVD}
            </p>
            <p>
              <strong>Bilheteira:</strong> {movie.BoxOffice}
            </p>
            <p>
              <strong>Produção:</strong> {movie.Production}
            </p>
            <p>
              <strong>Website:</strong> {movie.Website}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white w-full h-full mt-[100px] flex justify-center items-center gap-[150px]">
          <h1 className="text-[31px]">Filme não encontrado!</h1>
        </div>
      )}
    </main>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.params as { slug: string };
  const API_KEY = process.env.API_KEY;

  try {
    const res = await movieAPI.get(`?t=${slug}&apikey=${API_KEY}`);

    const {
      Title,
      Poster,
      Year,
      Rated,
      Released,
      Runtime,
      Genre,
      Director,
      Writer,
      Actors,
      Plot,
      Language,
      Country,
      Awards,
      Ratings,
      Metascore,
      imdbRating,
      imdbVotes,
      imdbID,
      Type,
      DVD,
      BoxOffice,
      Production,
      Website,
    } = res.data;

    return {
      props: {
        movie: {
          Title: Title ?? null,
          Poster: Poster ?? null,
          Year: Year ?? null,
          Rated: Rated ?? null,
          Released: Released ?? null,
          Runtime: Runtime ?? null,
          Genre: Genre ?? null,
          Director: Director ?? null,
          Writer: Writer ?? null,
          Actors: Actors ?? null,
          Plot: Plot ?? null,
          Language: Language ?? null,
          Country: Country ?? null,
          Awards: Awards ?? null,
          Ratings: Ratings ?? null,
          Metascore: Metascore ?? null,
          imdbRating: imdbRating ?? null,
          imdbVotes: imdbVotes ?? null,
          imdbID: imdbID ?? null,
          Type: Type ?? null,
          DVD: DVD ?? null,
          BoxOffice: BoxOffice ?? null,
          Production: Production ?? null,
          Website: Website ?? null,
        },
        slug,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados do filme:", error);
    return {
      props: {
        movie: null,
        slug,
      },
    };
  }
};
