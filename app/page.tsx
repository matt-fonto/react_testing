export type Country = {
  name: string;
  capital: string;
  population: string;
  currency: string;
};

export const countries: Country[] = [
  {
    name: "Austria",
    capital: "Vienna",
    population: "8.9 million",
    currency: "Euro",
  },
  {
    name: "Italy",
    capital: "Rome",
    population: "60.4 million",
    currency: "Euro",
  },
  {
    name: "Germany",
    capital: "Berlin",
    population: "83.2 million",
    currency: "Euro",
  },
  {
    name: "USA",
    capital: "Washington D.C.",
    population: "331 million",
    currency: "US Dollar",
  },
  {
    name: "Brazil",
    capital: "Brasília",
    population: "212 million",
    currency: "Brazilian Real",
  },
];

export default function Home() {
  return (
    <main
      data-testid="container-home-page"
      className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <h2 data-testid="heading-countries">Countries</h2>

      {countries.map((country) => (
        <CountryCard key={country.name} country={country} />
      ))}
    </main>
  );
}

function CountryCard({ country }: { country: Country }) {
  const { name, capital, population, currency } = country;

  return (
    <article
      className="border rounded-lg shadow-md p-4"
      data-testid={`country-card-${name}`}
      aria-label={`Details of ${name}`}
    >
      <header className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">{capital}</p>
      </header>

      <div className="text-sm text-gray-700">
        <p className="mb-2">
          <span className="font-medium">Population:</span>{" "}
          {population.toLocaleString()}
        </p>
        <p>
          <span className="font-medium">Currency:</span> {currency}
        </p>
      </div>
    </article>
  );
}
