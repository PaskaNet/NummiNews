import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// Define the structure for a news article
interface NewsArticle {
    category: string;
    title: string;
    snippet?: string;
    imageUrl: string;
    author: string;
    publishedDate: string;
    fullContent: string[];
    images: string[];
}

const Header = () => {
  const octoberWeathers = [
    { temp: 7, location: 'Kirkkonummi', condition: 'Rainy' },
    { temp: 10, location: 'Kirkkonummi', condition: 'Cloudy' },
    { temp: 12, location: 'Kirkkonummi', condition: 'Partly Sunny' },
    { temp: 5, location: 'Kirkkonummi', condition: 'Windy' },
  ];
  
  const [weather] = useState(octoberWeathers[Math.floor(Math.random() * octoberWeathers.length)]);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-nummi">Nummi</span>
          <span className="logo-news">News</span>
        </div>
        <nav className="navigation">
          <a href="#" className="nav-link active">Etusivu</a>
          <a href="#" className="nav-link">Sää</a>
        </nav>
        <div className="weather-widget">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="weather-icon"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
          <div className="weather-info">
              <>
                <span className="temperature">{weather.temp}°C</span>
                <span className="location">{weather.location}</span>
              </>
          </div>
        </div>
      </div>
    </header>
  );
};

const Ticker = () => {
    const tickerItems = [
        "JUURI NYT: Onnistunut interseptio Kirkkonummessa",
        "PÄIVÄN TÄRKEIN: Merkittävä ilmoitus koskien alueen vesihuoltoa",
        "UUTINEN: LARKSPIUR-projekti saavuttaa uuden virstanpylvään",
        "TEKNOLOGIA: Uusi tekoälymalli mullistaa paikalliset palvelut",
    ];
    return (
        <div className="ticker-bar">
            <div className="ticker-content">
                {tickerItems.map((item, index) => <span key={index} className="ticker-item">{item}</span>)}
                {tickerItems.map((item, index) => <span key={index} className="ticker-item" aria-hidden="true">{item}</span>)}
            </div>
        </div>
    )
}

const NewsCard: React.FC<{ article: NewsArticle, onClick: () => void }> = ({ article, onClick }) => (
    <div className="news-card" onClick={onClick} style={{backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 70%), url(${article.imageUrl})`}}>
        <div className="card-content">
            <span className="category-tag">{article.category}</span>
            <h3 className="card-title">{article.title}</h3>
            <p className="card-snippet">{article.snippet}</p>
        </div>
    </div>
);

const NewsArticleRow: React.FC<{article: NewsArticle, onClick: () => void}> = ({ article, onClick }) => (
    <div className="news-article-row" onClick={onClick}>
        <div className="article-details">
            <span className="category-tag-list">{article.category}</span>
            <h4 className="article-title">{article.title}</h4>
        </div>
        <div className="article-image-container">
            <img src={article.imageUrl} alt={article.title} className="article-thumbnail" />
        </div>
    </div>
);

const NewsSection: React.FC<{ title: string, children: React.ReactNode, className?: string }> = ({ title, children, className }) => (
    <section className={`news-section ${className || ''}`}>
        <h2 className="section-title">{title}</h2>
        <div className="news-content-wrapper">
            {children}
        </div>
    </section>
);

const ArticleView: React.FC<{ article: NewsArticle, onClose: () => void }> = ({ article, onClose }) => (
    <div className="article-view">
        <button onClick={onClose} className="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Takaisin
        </button>
        <header className="article-header">
            <span className="category-tag">{article.category}</span>
            <h1 className="article-view-title">{article.title}</h1>
            <div className="article-meta">
                <span>Kirjoittaja: {article.author}</span>
                <span>Julkaistu: {article.publishedDate}</span>
            </div>
        </header>
        <img src={article.imageUrl} alt={article.title} className="article-main-image" />
        <div className="article-body">
            {article.fullContent.map((paragraph, index) => (
                <React.Fragment key={index}>
                    <p>{paragraph}</p>
                    {article.images[index] && <img src={article.images[index]} alt="" className="article-inline-image" />}
                </React.Fragment>
            ))}
        </div>
    </div>
);

const Intro = () => {
    const numDroplets = 50;
    const logoNummi = "Nummi".split('');
    const logoNews = "News".split('');

    return (
        <div className="intro-overlay">
            <div className="intro-block">
                <h1 className="intro-logo" aria-label="NummiNews">
                    {logoNummi.map((char, index) => (
                        <span key={`nummi-${index}`} className="nummi-char" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                            {char}
                        </span>
                    ))}
                    {logoNews.map((char, index) => (
                        <span key={`news-${index}`} className="news-char" style={{ animationDelay: `${0.5 + (logoNummi.length + index) * 0.1}s` }}>
                            {char}
                        </span>
                    ))}
                </h1>
                {Array.from({ length: numDroplets }).map((_, index) => (
                    <div
                        key={index}
                        className="droplet"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${1.5 + Math.random() * 1}s`,
                            animationDuration: `${0.5 + Math.random() * 0.5}s`
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

const App = () => {
    const [showIntro, setShowIntro] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 4500); // Total duration for the intro animation

        return () => clearTimeout(timer);
    }, []);

    const kntVictoryArticle: NewsArticle = {
        category: 'Konflikti',
        title: '⚔️ KNT kukisti Nuristanin — suuri taistelu päättyi vallankumoukseen',
        snippet: 'Kirkkonummen KNT on tänään ilmoittanut suorittaneensa onnistuneen operaation Nuristanin alueella, jonka seurauksena alueen uskonnollinen johto on syrjäytetty.',
        imageUrl: 'https://i.postimg.cc/yN9JTqCh/image.png',
        author: "NummiNews – Kirkkonummi",
        publishedDate: "27.10.2025",
        fullContent: [
            "Kirkkonummen KNT on tänään ilmoittanut suorittaneensa onnistuneen operaation Nuristanin alueella, jonka seurauksena alueen uskonnollinen johto on syrjäytetty ja Nuristanin de facto -hallinto murskattu. KNT:n mukaan operaatio huipentui laajamittaiseen taisteluun, jossa vastustajina oli yhteensä noin 1 302 aseistettua taistelijaa, joiden varustukseen kuului sekä tuli- että lähitaisteluaseita — mm. kevyitä kiväärejä sekä lähempää käytettyjä miekkoja.",
            "KNT tiedottaa, että useita taistelijoita neutralisoitiin operaatiossa ja että kriittiset tukikohdat Al-Nurin alueella valjastettiin nopeasti KNT:n hallintaan. Operaatiossa käytettiin maajoukkojen lisäksi helikopterivalvontaa, joka seurasi vastustajan liikkeitä ja tarjosi reaaliaikaisen tiedustelutiedon maajoukkojen käyttöön.",
            "“Tämä operaatio oli välttämätön askel etelärajan rauhan ja Kirkkonummen turvallisuuden varmistamiseksi. KNT on onnistunut purkamaan Nuristanin sotilaallisen kyvyn ja estämään välittömän uhan kansalaisillemme”, kertoi KNT:n komentaja tiedotteessa.",
            "Presidentti Joona kommentoi tuloksia: “Kirkkonummi ei hyväksy siviilejä vastaan suunnattua väkivaltaa tai alueellista terroria. Tänään näemme konkreettisen tuloksen siitä, että puolustuksemme toimii. Nyt vastaamme myös humanitaarisesti — eloonjääneet siviilit ja vangit käsitellään kansainvälisten periaatteiden ja Kirkkonummen lakien mukaisesti.”",
            "KNT:n mukaan operaation sujuvuus perustui edeltävään tiedustelutyöhön (mm. operaatio “Hiljainen Puutarha”), rajavalvonnan tiivistämiseen ja nopeaan lippujärjestelyyn maavoimien ja ilmatiedustelun välillä. Helikopterit raportoivat reaaliaikaisesti liikkeistä ja auttoivat paikantamaan tiiviit kannattajakeskittymät, jolloin maajoukot pystyivät kohdistamaan toimet nopeasti.",
            "Tilanne Al-Nurissa on toistaiseksi rauhoittumassa KNT:n valvonnassa. KNT ilmoitti ottaneensa haltuunsa valtaamiaan linnoituksia, moskeijoita, ja viestintäkeskuksia sekä sulkeneensa tärkeimmät raja- ja rantareitit. Useita Nuristanin avainhenkilöitä on pidätetty; heidän kohtalostaan KNT tiedottaa myöhemmin.",
            "KNV on käynnistänyt välittömiä turvallisuustoimia alueen vakauttamiseksi ja humanitaarisen avun järjestämiseksi. Pelastus- ja huoltoyksiköt on asetettu valmiuteen kuljettamaan apua alueelle, kun tilanne sallii.",
            "NummiNewsin lähteiden mukaan tapahtumakulku oli intensiivinen: KNT:n joukot etenivät koordinoidusti useasta suunnasta, ja Nuristanin taistelijat yrittivät vastahyökkäyksiä erityisesti eteläisillä rannikkolinjoilla. Lopullinen voitto varmistui, kun KNT sai katkaistua vihollisen viestintäyhteydet ja ohjasi helikopteri- ja tiedustelutiedon perusteella kohdennettuja iskuja vihollisketjuihin.",
            "Nuristanin uskonnollisesta johdosta ei tiedetä vielä tarkkaa tilannetta; toistaiseksi KNT ei ole vahvistanut, onko Ahmad Ali Kan vangittu, paennut vai kaatunut. Alueen asukkaiden turvallisuuden takaaminen ja mahdollisten sotarikosilmoitusten tutkinta ovat nyt viranomaisten prioriteetteja.",
            "Tilannetta seurataan tiiviisti. NummiNews päivittää uutista heti, kun lisätietoja tulee saataville."
        ],
        images: [],
    };
    
    const nuristanArticle: NewsArticle = {
        category: 'Konflikti',
        title: '🕯️ Nuristanin isku Niilikylään – koko kylä tuhottu',
        snippet: 'Kirkkonummen etelärajalta on vahvistettu vakavia tietoja Nuristanin joukkojen tekemästä hyökkäyksestä. Koko Niilikylä on tuhottu ja arviolta 200 siviiliä on menehtynyt.',
        imageUrl: 'https://i.postimg.cc/hPdwSfK2/Nayttokuva-2025-10-26-215259.png',
        author: "NummiNews – Kirkkonummi",
        publishedDate: "26.10.2025",
        fullContent: [
            "Kirkkonummen etelärajalta on vahvistettu vakavia tietoja Nuristanin joukkojen tekemästä hyökkäyksestä pieneen kylään, joka sijaitsee Nuristanin ja Kirkkonummen rajavyöhykkeen itäpuolella. KNT:n alustavan raportin mukaan koko Niilikylä on tuhottu, ja arviolta 200 siviiliä on menehtynyt.",
            "Hyökkäys alkoi varhain aamulla, kun Nuristanin uskonnolliset miliisit tunkeutuivat kylään kameleilla ja kevyellä aseistuksella. Kylän asukkailla ei ollut mahdollisuutta puolustautua. KNT:n tiedustelulähteet kertovat, että hyökkäyksen yhteydessä on käytetty droonivalvontaa ja kevyitä ilmaiskuja, joiden alkuperää tutkitaan parhaillaan.",
            "“Kyseessä on järjestelmällinen ja brutaali hyökkäys siviiliväestöä vastaan”, totesi KNT:n edustaja NummiNewsille. “Kaikki merkit viittaavat Nuristanin valtion järjestämään operaatioon, jota johtivat Ahmad Ali Kanin alaiset taistelijat.”",
            "Silminnäkijöiden mukaan hyökkääjillä oli Nuristanin valtion lippu kilvissään ja he kantoivat perinteisiä valkoisia kaapuja ja turbaania. Kylän rakennukset on poltettu maan tasalle, ja useat ruumiit on löydetty kaduilta. KNT:n pelastusyksiköt eivät ole vielä päässeet alueelle aktiivisen taistelutilanteen vuoksi.",
            "Kirkkonummen hallitus on kutsunut koolle hätäkokouksen turvallisuustilanteen arvioimiseksi. KNV on puolestaan nostanut etelärajan valvontavalmiuden tasolle 3, mikä tarkoittaa jatkuvaa ilmatilaseurantaa ja rajatarkkailua.",
            "Nuristanin hallinto ei ole kommentoinut tapahtunutta, mutta Al-Nurin viranomaislähteet ovat julkaisseet uskonnollisia lausuntoja, joissa “pyhää sotaa epäuskoisia vastaan” on kutsuttu “välttämättömäksi”.",
            "KNT:n arvioiden mukaan isku oli tarkkaan suunniteltu provokaatio, jolla Nuristan pyrkii testaamaan Kirkkonummen reagointia ja etelärajan puolustusta.",
            "Tilanne Niilikylän ympäristössä on yhä äärimmäisen jännittynyt, ja lisätietoja odotetaan seuraavien tuntien aikana."
        ],
        images: [],
    };

    const welcomeArticle: NewsArticle = {
        category: 'Uutinen',
        title: 'NummiNews on auki!',
        snippet: 'Kauan odotettu sivuston toinen versio on vihdoin täällä! Tutustu uusiin ominaisuuksiin ja moderniin ulkoasuun.',
        imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAHSA8gDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1VldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA-MiI1IcbBUnz2/gq3K//wB2/gYIq2V/+7fwH8W//wDKl/gf9q3//AJUv8D/tVw/7S/wP+23D/wDS/wAB/Wrf/wDlS/wH/W3B/wBr/gP/AH9x/wDkf4D/AL/cR/8AI/wH/AH/xH/In+B/3+xP/AJA/wH/AZif8g/wD/gMxf/kD/wAA/wCBmL/yB/4H/gSi/wCQf+B/4EY/+Q/8D/gRj/8Ay/wH/gRj/wD/AAP/AAVj/8v/AID/AMFY/wD5f4D/AMFY/wD5fwP/AAbD/wB//gP/AAbf+j/A/wCDf+D/AAH/AIN/wf+B/wCDi/+CP/gf+DiX/gj/AMH/g4v/AOCf/wAD/g3j/wD4n/A/+DeP/wDk/gf+DeT/AJD/AMH/g1/8B/wAH/g1/wL+D/wAGP8H/gP8Agy/g/wDAf+DD+A/wH/hf/AOD/gH/DP/AOH/APA/8M/+H/gP+F/gf+Gf4H/h/wP/AAf8Ef8AD/wf+Af8H/gH/B/wD+D/g/8A//Z',
        author: "NummiNews Toimitus",
        publishedDate: "24.10.2024",
        fullContent: [
            "Tervetuloa NummiNewsin uudelle sivustolle! Olemme tehneet kovasti töitä tarjotaksemme teille paremman ja sujuvamman käyttökokemuksen. Uusi sivusto on suunniteltu moderniksi ja helppokäyttöiseksi kaikilla laitteilla.",
            "Toivomme, että nautitte uudesta ulkoasusta ja parannetuista ominaisuuksista. Palautteenne on meille tärkeää, joten kertokaa meille, mitä mieltä olette!",
            "Tämä on uuden aikakauden alku NummiNewsille, ja olemme innoissamme siitä, mitä tulevaisuus tuo tullessaan. Pysykää kuulolla!"
        ],
        images: [
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADvAQIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1VldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA-MiI1IcbBUnz2/gq3K//wB2/gYIq2V/+7fwH8W//wDKl/gf9q3//AJUv8D/tVw/7S/wP+23D/wDS/wAB/Wrf/wDlS/wH/W3B/wBr/gP/AH9x/wDkf4D/AL/cR/8AI/wH/AH/xH/In+B/3+xP/AJA/wH/AZif8g/wD/gMxf/kD/wAA/wCBmL/yB/4H/gSi/wCQf+B/4EY/+Q/8D/gRj/8Ay/wH/gRj/wD/AAP/AAVj/8v/AID/AMFY/wD5f4D/AMFY/wD5fwP/AAbD/wB//gP/AAbf+j/A/wCDf+D/AAH/AIN/wf+B/wCDi/+CP/gf+DiX/gj/AMH/g4v/AOCf/wAD/g3j/wD4n/A/+DeP/wDk/gf+DeT/AJD/AMH/g1/8B/wAH/g1/wL+D/wAGP8H/gP8Agy/g/wDAf+DD+A/wH/hf/AOD/gH/DP/AOH/APA/8M/+H/gP+F/gf+Gf4H/h/wP/AAf8Ef8AD/wf+Af8H/gH/B/wD+D/g/8A//Z',
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADvAQIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1VldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA-MiI1IcbBUnz2/gq3K//wB2/gYIq2V/+7fwH8W//wDKl/gf9q3//AJUv8D/tVw/7S/wP+23D/wDS/wAB/Wrf/wDlS/wH/W3B/wBr/gP/AH9x/wDkf4D/AL/cR/8AI/wH/AH/xH/In+B/3+xP/AJA/wH/AZif8g/wD/gMxf/kD/wAA/wCBmL/yB/4H/gSi/wCQf+B/4EY/+Q/8D/gRj/8Ay/wH/gRj/wD/AAP/AAVj/8v/AID/AMFY/wD5f4D/AMFY/wD5fwP/AAbD/wB//gP/AAbf+j/A/wCDf+D/AAH/AIN/wf+B/wCDi/+CP/gf+DiX/gj/AMH/g4v/AOCf/wAD/g3j/wD4n/A/+DeP/wDk/gf+DeT/AJD/AMH/g1/8B/wAH/g1/wL+D/wAGP8H/gP8Agy/g/wDAf+DD+A/wH/hf/AOD/gH/DP/AOH/APA/8M/+H/gP+F/gf+Gf4H/h/wP/AAf8Ef8AD/wf+Af8H/gH/B/wD+D/g/8A//Z',
            'https://i.postimg.cc/Vk1XhH10/image.png'
        ],
    };

    const importantNews: NewsArticle[] = [kntVictoryArticle, nuristanArticle];
    const allNews: NewsArticle[] = [kntVictoryArticle, nuristanArticle, welcomeArticle];

    const handleArticleSelect = (article: NewsArticle) => {
        setSelectedArticle(article);
    };

    const handleCloseArticle = () => {
        setSelectedArticle(null);
    };

  return (
    <div className="app-container">
        {showIntro && <Intro />}
        <div className={`main-app-wrapper ${showIntro ? 'hidden' : 'visible'}`}>
            <Header />
            <Ticker />
            <main className="main-content">
                <div className={`content-column ${selectedArticle ? 'viewing-article' : ''}`}>
                    {selectedArticle ? (
                        <ArticleView article={selectedArticle} onClose={handleCloseArticle} />
                    ) : (
                        <>
                            <NewsSection title="Etusivu" className="important-news-section">
                                {importantNews.map(news => <NewsCard key={news.title} article={news} onClick={() => handleArticleSelect(news)} />)}
                            </NewsSection>
                            <NewsSection title="Kaikki Uutiset" className="all-news-section">
                                {allNews.map(news => <NewsArticleRow key={news.title} article={news} onClick={() => handleArticleSelect(news)} />)}
                            </NewsSection>
                        </>
                    )}
                </div>
            </main>
        </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);