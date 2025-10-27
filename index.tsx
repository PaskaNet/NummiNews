
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
    images: (string | null)[];
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
                    {article.images[index] && <img src={article.images[index] as string} alt="" className="article-inline-image" />}
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

    const lehtonenArticle: NewsArticle = {
        category: 'Rikos',
        title: 'Juha Lehtonen löydetty kuolleena – KNT tutkii tapausta murhana',
        snippet: '38-vuotias kirkkonummelainen mies, Juha Lehtonen, on löydetty kuolleena myöhään iltapäivällä Kirkkonummen messukeskuksen edustalta.',
        imageUrl: 'https://i.postimg.cc/tJvLwrVb/image.png',
        author: "NummiNews Toimitus",
        publishedDate: "31.10.2025",
        fullContent: [
            "KOSKIKYLÄ / KIRKKONUMMEN KESKUSTA – 38-vuotias kirkkonummelainen mies, Juha Lehtonen, on löydetty kuolleena myöhään iltapäivällä Kirkkonummen messukeskuksen edustalta. KNT vahvistaa, että kyseessä on henkirikos, ja tutkinta on käynnistetty kiireellisenä.",
            "Lehtonen työskenteli Koskikylän motellissa ja asui samassa kaupunginosassa. Hänen liikkeistään ennen kuolemaa on saatu useita vahvistettuja havaintoja.",
            "Ensimmäinen havainto tehtiin tänään iltapäivällä kello 15.17 Koskikylän motellilla, jossa Lehtonen nähtiin työtehtävissään. Hetkeä myöhemmin, klo 15.25, hänet havaittiin motellin toisessa huoneessa. Sen jälkeen hänen puhelimensa paikannettiin liikkuneen kohti keskustaa.",
            "Viimeinen varmistettu havainto Lehtosesta tehtiin noin klo 16.00 Vanhan kaupungin ja Uuden keskustan yhdistävällä sillalla, jossa valvontakameran kasvontunnistus vahvisti hänen henkilöllisyytensä. Kamera-aineiston mukaan hän liikkui sillan vasemmalla puolella, Uuden keskustan puoleisella nurmikkoalueella, josta johtaa metsäinen polku kohti valtuustotaloa.",
            "Lehtosen ruumis löydettiin myöhemmin, noin 600 metrin päässä havaintopaikasta, messukeskuksen ovien edustalta. Ensihoidon alustavan raportin mukaan hänet on ammuttu.",
            "KNT:n rikostekninen yksikkö on eristänyt alueen ja aloittanut laajan teknisen tutkinnan. Tutkinnassa selvitetään, oliko kyse suunnitellusta teosta vai mahdollisesti satunnaisesta väkivallanteosta.",
            "”Tapaus on erittäin vakava, ja se käsitellään korkeimmalla prioriteetilla. Kaikki mahdolliset havainnot Lehtosen liikkeistä tänään kello 15:n ja 17:n välillä ovat tutkinalle tärkeitä,” totesi KNT:n tutkinnanjohtaja iltapäivän tiedotustilaisuudessa.",
            "Poliisi pyytää silminnäkijöitä tai mahdollisia tietolähteitä ilmoittautumaan välittömästi. Erityisen kiinnostavia ovat havainnot Vanhan kaupungin sillan alueelta, Uuden keskustan puolelta.",
            "Tapausta tutkitaan murhana, ja KNT jatkaa kuulusteluja sekä teknisiä tutkimuksia yön yli.",
            "Lisätietoja julkaistaan, kun tutkinta etenee."
        ],
        images: [
            null,
            "https://i.postimg.cc/d33f28Nz/image.png",
            "https://i.postimg.cc/Xvg1t2TC/image.png",
            "https://i.postimg.cc/v8xkZv9r/image.png",
            "https://i.postimg.cc/5ymw2GmJ/image.png",
            null,
            null,
            null,
            null,
            null
        ],
    };
    
    const downtownLivingArticle: NewsArticle = {
        category: 'Elämäntapa',
        title: '5 syytä maksaa vähän enemmän ja muuttaa Kirkkonummen keskusta-alueelle',
        snippet: 'Keskusta-alueen kiinteistöt eivät ehkä ole halvin vaihtoehto, mutta pieni lisähinta voi tuoda arkeesi huomattavasti enemmän nautintoa ja mukavuutta.',
        imageUrl: 'https://i.postimg.cc/nrkyqLhy/image.png',
        author: "NummiNews Toimitus",
        publishedDate: "30.10.2025",
        fullContent: [
            "KIRKKONUMMI – Keskusta-alueen kiinteistöt eivät ehkä ole halvin vaihtoehto, mutta pieni lisähinta voi tuoda arkeesi huomattavasti enemmän nautintoa ja mukavuutta. Tässä viisi syytä, miksi sijoitus kannattaa:",
            "1. Simban perintö ympärilläsi – Keskustan historialliset paikat ja Simba-patsaat tuovat ainutlaatuisen tunnelman, jota ei löydy muualta kaupungista.",
            "2. Kahviloita ja ravintoloita joka kulmassa – Aamukahvi, lounas tai illallinen syntyy helposti kävelymatkan päästä. Komforti yhdistettynä kulinaristiseen nautintoon tekee arjesta juhlaa.",
            "3. Turvallisuus kohdallaan – KNT ja KNV valvovat aluetta tiiviisti. Keskustassa voi kulkea vapaasti, vaikka ympärillä tapahtuu kaupunkielämän vilinää.",
            "4. Julkiset palvelut lähellä – Kaupat, koulut ja terveyspalvelut ovat parin minuutin päässä. Kukaan ei kaipaa pitkiä matkoja arjen asioihin.",
            "5. Sosiaalinen elämä kukoistaa – Ympäristö houkuttelee niin nuoria kuin vanhempia asukkaita, ja tapahtumia on jatkuvasti. Keskustassa asuminen tarkoittaa, että elämä ei koskaan ole tylsää.",
            "Vaikka hintalappu saattaa olla hieman korkeampi, keskusta-alueen tuoma laatu ja mukavuus tekevät siitä sijoituksen, joka maksaa itsensä takaisin arjessa – ja ehkä vähän myös sielussa."
        ],
        images: [],
    };

    const airPocketsArticle: NewsArticle = {
        category: 'Paikallinen',
        title: 'KNV:n maanmittaus paljastaa Kirkkonummen "ilmataskut" – potentiaalia uudelle metropolille',
        snippet: 'KNV:n maanmittaus on paljastanut Kirkkonummen alta valtavia "ilmataskuja", jotka tarjoavat potentiaalia jopa kokonaisen uuden metropolin rakentamiseen maan alle.',
        imageUrl: 'https://i.postimg.cc/Zq5CN9KP/image.png',
        author: "NummiNews – Kirkkonummi",
        publishedDate: "29.10.2025",
        fullContent: [
            "KIRKKONUMMI – KNV on julkaissut alustavia tuloksia syvällisestä maanmittausoperaatiostaan, ja tulokset paljastavat merkittäviä epäkohtia Kirkkonummen nykyisestä rakenteesta. Erityisesti huomio kiinnittyy niin sanottuihin \"ilmataskuihin\", jotka ovat jääneet maan alle jo uuden keskustan rakentamisen HollowFill-tekniikan aikana.",
            "Ilmataskuiksi kutsutaan suuria tyhjiöitä ja tiloja, jotka syntyivät tukirankarakenne-elementtien vuoksi, kun keskusta rakennettiin nykyiseen muotoonsa. Alun perin nämä tilat mahdollistivat pilvenpiirtäjien jousituksen ja tasapainoelementit, mutta nyt niiden merkitys paljastuu uudessa valossa: maan alle voitaisiin rakentaa periaatteessa toinen samankokoinen metropoli.",
            "KNV:n asiantuntijat kuvaavat ilmiötä lupaavana mahdollisuutena, mutta samalla haasteellisena rakenteellisesta näkökulmasta. \"Potentiaalia on paljon, mutta meidän on huomioitava turvallisuus ja infrastruktuuri ennen kuin suunnittelemme mitään konkreettista\", kommentoi KNV:n projektijohtaja.",
            "Maanmittausoperaatio jatkuu, ja lisätietoja odotetaan lähiviikkoina, kun tarkemmat analyysit ja kartoitukset valmistuvat. Tilanne herättää kiinnostusta niin arkkitehtien, insinöörien kuin kaupungin suunnittelijoiden keskuudessa."
        ],
        images: [],
    };

    const metroArticle: NewsArticle = {
        category: 'Paikallinen',
        title: 'Kirkkonummen metro etenee – Central-linja lähes valmis ja kuviot alkavat näkyä',
        snippet: 'Kirkkonummen metrojärjestelmä etenee suunnitellusti, ja Central-linjan rakennustyöt ovat nyt lähes valmiit.',
        imageUrl: 'https://i.postimg.cc/52j3mttn/image.png',
        author: "NummiNews – Kirkkonummi",
        publishedDate: "28.10.2025",
        fullContent: [
            "KIRKKONUMMI, KESKUSTA – Kirkkonummen metrojärjestelmä etenee suunnitellusti, ja Central-linjan rakennustyöt ovat nyt lähes valmiit. Kaupunkilaiset ja matkustajat voivat pian nähdä ensimmäiset selkeät kuviot ja linjaukset tulevasta metroverkosta.",
            "Rakennustyöt ovat keskittyneet erityisesti Keskustorin ja Pajumäen väliin, missä tunnelit ja asemarakenteet alkavat muotoutua näkyviksi. KNV kertoo, että työn edistyminen vastaa suunniteltua aikataulua, ja ensimmäiset testiajot linjalla voidaan aloittaa lähikuukausina.",
            'Projektinjohtaja kommentoi: "Central-linja on tärkeä osa kaupungin julkisen liikenteen uudistusta. Nyt kuviot alkavat hahmottua, ja kaupunki saa selkeän käsityksen tulevasta liikenneverkosta."',
            "Metroverkoston kehitys on saanut myönteistä huomiota myös osavaltiotasolla, ja sen odotetaan helpottavan sekä arki- että työmatkaliikennettä merkittävästi. KNV muistuttaa, että turvallisuustarkastukset ja viimeistelytyöt jatkuvat edelleen ennen kuin metro avataan yleisölle."
        ],
        images: [],
    };
    
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
        imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAHSA8gDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1VldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA-MiI1IcbBUnz2/gq3K//wB2/gYIq2V/+7fwH8W//wDKl/gf9q3//AJUv8D/tVw/7S/wP+23D/wDS/wAB/Wrf/wDlS/wH/W3B/wBr/gP/AH9x/wDkf4D/AL/cR/8AI/wH/AH/xH/In+B/3+xP/AJA/wH/AZif8g/wD/gMxf/kD/wAA/wCBmL/yB/4H/gSi/wCQf+B/4EY/+Q/8D/gRj/8Ay/wH/gRj/wD/AAP/AAVj/8v/AID/AMFY/wD5f4D/AMFY/wD5fwP/AAbD/wB//gP/AAbf+j/A/wCDf+D/AAH/AIN/wf+B/wCDi/+CP/gf+DiX/gj/AMH/g4v/AOCf/wAD/g3j/wD4n/A/+DeP/wDk/gf+DeT/AJD/AMH/g1/8B/wAH/g1/wL+D/wAGP8H/gP8Agy/g/wDAf+DD+A/wH/hf/AOD/gH/DP/AOH/APA/8M/+H/gP+F/gf+Gf4H/h/wP/AAf8Ef8AD/wf+Af8H/gH/B/wD+D/g/8A//Z',
        author: "NummiNews Toimitus",
        publishedDate: "24.10.2024",
        fullContent: [
            "Tervetuloa NummiNewsin uudelle sivustolle! Olemme tehneet kovasti töitä tarjotaksemme teille paremman ja sujuvamman käyttökokemuksen. Uusi sivusto on suunniteltu moderniksi ja helppokäyttöiseksi kaikilla laitteilla.",
            "Toivomme, että nautitte uudesta ulkoasusta ja parannetuista ominaisuuksista. Palautteenne on meille tärkeää, joten kertokaa meille, mitä mieltä olette!",
            "Tämä on uuden aikakauden alku NummiNewsille, ja olemme innoissamme siitä, mitä tulevaisuus tuo tullessaan. Pysykää kuulolla!"
        ],
        images: [
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADvAQIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1VldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA-MiI1IcbBUnz2/gq3K//wB2/gYIq2V/+7fwH8W//wDKl/gf9q3//AJUv8D/tVw/7S/wP+23D/wDS/wAB/Wrf/wDlS/wH/W3B/wBr/gP/AH9x/wDkf4D/AL/cR/8AI/wH/AH/xH/In+B/3+xP/AJA/wH/AZif8g/wD/gMxf/kD/wAA/wCBmL/yB/4H/gSi/wCQf+B/4EY/+Q/8D/gRj/8Ay/wH/gRj/wD/AAP/AAVj/8v/AID/AMFY/wD5f4D/AMFY/wD5fwP/AAbD/wB//gP/AAbf+j/A/wCDf+D/AAH/AIN/wf+B/wCDi/+CP/gf+DiX/gj/AMH/g4v/AOCf/wAD/g3j/wD4n/A/+DeP/wDk/gf+DeT/AJD/AMH/g1/8B/wAH/g1/wL+D/wAGP8H/gP8Agy/g/wDAf+DD+A/wH/hf/AOD/gH/DP/AOH/APA/8M/+H/gP+F/gf+Gf4H/h/wP/AAf8Ef8AD/wf+Af8H/gH/B/wD+D/g/8A//Z',
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADvAQIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1VldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA-MiI1IcbBUnz2/gq3K//wB2/gYIq2V/+7fwH8W//wDKl/gf9q3//AJUv8D/tVw/7S/wP+23D/wDS/wAB/Wrf/wDlS/wH/W3B/wBr/gP/AH9x/wDkf4D/AL/cR/8AI/wH/AH/xH/In+B/3+xP/AJA/wH/AZif8g/wD/gMxf/kD/wAA/wCBmL/yB/4H/gSi/wCQf+B/4EY/+Q/8D/gRj/8Ay/wH/gRj/wD/AAP/AAVj/8v/AID/AMFY/wD5f4D/AMFY/wD5fwP/AAbD/wB//gP/AAbf+j/A/wCDf+D/AAH/AIN/wf+B/wCDi/+CP/gf+DiX/gj/AMH/g4v/AOCf/wAD/g3j/wD4n/A/+DeP/wDk/gf+DeT/AJD/AMH/g1/8B/wAH/g1/wL+D/wAGP8H/gP8Agy/g/wDAf+DD+A/wH/hf/AOD/gH/DP/AOH/APA/8M/+H/gP+F/gf+Gf4H/h/wP/AAf8Ef8AD/wf+Af8H/gH/B/wD+D/g/8A//Z',
            'https://i.postimg.cc/Vk1XhH10/image.png'
        ],
    };

    const importantNews: NewsArticle[] = [lehtonenArticle, downtownLivingArticle, airPocketsArticle, metroArticle];
    const allNews: NewsArticle[] = [lehtonenArticle, downtownLivingArticle, airPocketsArticle, metroArticle, kntVictoryArticle, nuristanArticle, welcomeArticle];

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
