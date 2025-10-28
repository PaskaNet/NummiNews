
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

const Ticker: React.FC<{ articles: NewsArticle[] }> = ({ articles }) => {
    const tickerItems = articles.map(article => article.title);
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

    const maroviaNovaArticle: NewsArticle = {
        category: 'Politiikka',
        title: 'MAROVIA LIITTYNYT NOVA-LIITTOON: YHTEISÖLLE UUSI AIKAKAUSI',
        snippet: 'Marovia on virallisesti liittynyt NOVA-liittoon, strategiseen yhteistyöjärjestöön, johon kuuluvat jo Kirkkonummi ja Nuristan.',
        imageUrl: 'https://i.postimg.cc/52MtfMXk/2025-10-27-22-51-56.png',
        author: "NummiNews",
        publishedDate: "1.11.2025",
        fullContent: [
            "KIRKKONUMMI / NURISTAN / MAROVIA – Marovia on virallisesti liittynyt NOVA-liittoon, strategiseen yhteistyöjärjestöön, johon kuuluvat jo Kirkkonummi ja Nuristan. Liiton tarkoituksena on vahvistaa jäsenvaltioiden keskinäistä puolustusta, taloudellista yhteistoimintaa ja humanitaarista yhteistyötä.",
            "Seremonia järjestettiin tänään Nuristanin hallintokeskuksessa, missä Marovian edustajat allekirjoittivat NOVA-peruskirjan presidentti Farid al-Naseemin ja Kirkkonummen ulkoministerin läsnä ollessa.",
            "”Tämä päivä on historiallinen – Marovia seisoo nyt rinnallamme rauhan ja vakauden puolesta,” totesi presidentti al-Naseem puheessaan.",
            "NOVA-liiton tavoitteena on muun muassa: yhteinen puolustuspoliittinen neuvosto, rajaturvallisuuden ja tiedustelun jakaminen, yhteiset jälleenrakennus- ja energiaohjelmat, sekä humanitaarinen tuki kriisialueille.",
            "Marovian liittymistä on pidetty merkittävänä vahvistuksena liitolle. Alueen geopoliittinen asema sekä luonnonvarat mahdollistavat entistä laajemman yhteistyön myös Kirkkonummen kanssa, erityisesti infrastruktuurin ja turvallisuusteknologian osalta.",
            "Kirkkonummen hallitus on ilmaissut tyytyväisyytensä sopimukseen ja todennut sen ”vahvistavan koko alueen strategista yhtenäisyyttä ja turvallisuutta.”",
            "”NOVA ei ole vain liitto valtioiden välillä – se on lupaus keskinäisestä avusta,” kommentoi Kirkkonummen edustaja allekirjoitustilaisuudessa.",
            "🌐 NummiNews – seuraa NOVA-liiton kehitystä ja sen vaikutuksia Kirkkonummen asemaan alueellisena johtajana."
        ],
        images: [],
    };
    
    const niilikylaReconstructionArticle: NewsArticle = {
        category: 'Jälleenrakennus',
        title: 'NURISTAN: NIILIKYLÄN JÄLLEENRAKENNUS ALKANUT 🏗️',
        snippet: 'Niilikylän jälleenrakennus on virallisesti aloitettu. Työt käynnistyivät pääaukion ja vanhan rautatieaseman ympäristössä.',
        imageUrl: 'https://i.postimg.cc/7L8Svc45/2025-10-28-23-04-50.png',
        author: "NummiNews – Nuristan",
        publishedDate: "31.10.2025",
        fullContent: [
            "NURISTAN / NIILIKYLÄ – Niilikylän jälleenrakennus on virallisesti aloitettu tänään aamulla. Työt käynnistyivät pääaukion ja vanhan rautatieaseman ympäristössä, missä ensimmäiset rakennusmoduulit nostettiin paikoilleen.",
            "KNT:n turvayksiköt ja Nuristanin jälleenrakennusministeriö valvovat työtä tiiviissä yhteistyössä. Suunnitelmien mukaan Niilikylä liitetään hallinnollisesti Nuristanin valtioon toisena kaupunginosana, ja sen odotetaan tarjoavan asuin- ja työpaikkoja jopa 30 000–40 000 asukkaalle valmistuessaan.",
            "”Tämä on uuden aikakauden alku – Niilikylästä tulee symboli yhtenäisyydelle ja toivolle,” kommentoi presidentti Farid al-Naseem peruskiven laskun yhteydessä.",
            "Kaupunginosaan rakennetaan moderni infrastruktuuri, kouluja, terveysasema ja markkina-alue. Rakennusvaiheen arvioidaan kestävän noin kaksi vuotta.",
            "📸 KATSO KUVAT:",
            "Ensimmäiset nosturit ja työjoukot Niilikylässä",
            "Aamun peruskiven laskutilaisuus",
            "Uuden keskustorin suunnitelmapiirros",
            "Rakenteilla oleva vesikanava ja sillat",
            "🌐 NummiNews seuraa jälleenrakennuksen etenemistä viikoittain."
        ],
        images: [
            null,
            null,
            null,
            null,
            null,
            'https://i.postimg.cc/L5bZxQvL/2025-10-28-23-04-33.png',
            'https://i.postimg.cc/JhLHYk3N/2025-10-28-23-04-29.png',
            'https://i.postimg.cc/fypJctTW/2025-10-28-23-04-25.png',
            null,
            null
        ],
    };
    
    const kntGreatBattleVictoryArticle: NewsArticle = {
        category: 'Konflikti',
        title: 'NURISTAN: KNT VOITTI SUURTAISTELUN, SHIA-JOUKOT TAPPIOON',
        snippet: 'Kirkkonummen Turva (KNT) on vahvistanut, että Nuristanin eteläalueella käyty vuorokauden mittainen suurtaistelu on päättynyt Kirkkonummen ja Nuristanin yhteisjoukkojen voittoon.',
        imageUrl: 'https://i.postimg.cc/6pDy2G1K/2025-10-28-22-10-58.png',
        author: "NummiNews – Kirkkonummi",
        publishedDate: "29.10.2025",
        fullContent: [
            "NURISTAN / KIRKKONUMMI – Kirkkonummen Turva (KNT) on vahvistanut varhain tänään, että Nuristanin eteläalueella käyty vuorokauden mittainen suurtaistelu on päättynyt Kirkkonummen ja Nuristanin yhteisjoukkojen voittoon.",
            "Operaatio, joka alkoi eilen aamuyöllä, laajeni nopeasti täysimittaiseksi taisteluksi, kun noin 20 000 aseistautunutta shia-taistelijaa kävi hyökkäykseen Nuristanin hallintoa ja sen liittolaisia vastaan. KNT:n ja Nuristanin armeijan yhteisoperaatio onnistui torjumaan hyökkäyksen ja eliminoimaan vihollisjoukot lähes kokonaan.",
            "”Taistelut kestivät lähes 24 tuntia. Kaikki strategiset kohteet ovat nyt hallinnassamme, eikä siviilitappioita ole raportoitu. Nuristan on jälleen turvallinen,” kertoi KNT:n tiedusteluosaston edustaja varhain aamulla.",
            "Suurin osa shia-joukoista vetäytyi tai antautui taistelujen loppuvaiheessa. Arvioiden mukaan satoja pakeni rajan yli vuoristoon, ja alueella suoritetaan edelleen erillisiä etsintäoperaatioita.",
            "Nuristanin presidentti Farid al-Naseem julkaisi aamulla lausunnon, jossa hän kiitti Kirkkonummea nopeasta avusta ja vahvasta reagoinnista: ”Kirkkonummen tuki on ollut ratkaiseva. Tänään Nuristan on vapaa ja yhtenäinen.”",
            "KNT:n pääjoukot ovat jääneet alueelle turvaamaan järjestyksen ja auttamaan jälleenrakennuksessa, kun Nuristanin oma puolustusverkosto ja hallintorakenne palautetaan täyteen toimintakuntoon.",
            "Viranomaisten mukaan taistelu oli suurin Kirkkonummen johtama sotilasoperaatio sitten vuoden 2016 kriisin, ja sen katsotaan palauttaneen vakauden koko alueelle.",
            "Tilanne on nyt rauhoittumassa, ja Nuristanin hallinto on julistanut kolmen päivän juhla- ja rukousajan voiton kunniaksi.",
            "🕊️ ”Rauha palaa, kun varjo väistyy.”"
        ],
        images: [
            null, 
            'https://i.postimg.cc/sXtrKp7R/image.png', 
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
    };
    
    const nuristanMuslimsReportArticle: NewsArticle = {
        category: 'Konflikti',
        title: 'ERIKOISRAPORTTI: NURISTANIN MUSLIMIT PUHUVAT KONFLIKTISTA',
        snippet: 'Nuristanin taisteluiden jälkimainingeissa alue on hiljentynyt, mutta henkinen jännite on yhä aistittavissa. NummiNews haastatteli paikallisia muslimeja.',
        imageUrl: 'https://i.postimg.cc/rsPqBvBV/2025-10-28-21-33-48.png',
        author: "NummiNews – Nuristan",
        publishedDate: "30.10.2025",
        fullContent: [
            "NURISTAN – Nuristanin taisteluiden jälkimainingeissa alue on hiljentynyt, mutta henkinen jännite on yhä aistittavissa. KNT:n ja Nuristanin viranomaisten valvonnan alla kylät palaavat arkeen – hitaasti mutta varmasti. NummiNews sai poikkeuksellisen mahdollisuuden haastatella paikallisia muslimeja, jotka kertoivat ajatuksistaan ja kokemuksistaan tuoreesta konfliktista.",
            "Monet haastatellut korostivat, etteivät he olleet osallisina aseellisiin yhteenottoihin, vaan joutuivat seuraamaan tapahtumia sivusta.",
            "”Me emme halua sotaa. Me haluamme työtä, koulua lapsille ja rauhaa,” sanoi 42-vuotias kauppias Abdul Rahman, joka menetti kotinsa taistelujen aikana mutta on nyt palaamassa Nuristanin keskustaan.",
            "Useat haastatelluista toivat esiin huolensa ääriliikkeiden vaikutuksesta paikalliseen yhteisöön.",
            "”Meitä on monenlaisia muslimeja. Ne, jotka tarttuivat aseisiin, eivät edusta meitä,” totesi nuori opettaja Layla Hassan, jonka koulu toimi hetken ajan evakuointikeskuksena taistelujen aikana.",
            "Paikallisen moskeijan imaami Rashid Omar al-Hafiz painotti, että Nuristanin tulevaisuus voi rakentua vain yhteisymmärrykselle ja yhteistyölle:",
            "”Olemme kärsineet kaikki – muslimit ja kristityt. Nyt on aika antaa anteeksi ja rakentaa yhdessä. Rauha ei synny pakolla, vaan tahdosta.”",
            "KNT:n edustajat vahvistivat, että Nuristanissa asuvat siviilit, myös muslimiväestö, saavat jatkossa turvata uuden hallinnon ja humanitaarisen ohjelman kautta. Avustustyöt ovat jo käynnissä ja useita moskeijoita sekä yhteisötaloja korjataan parhaillaan.",
            "Presidentti Farid al-Naseem totesi illan puheessaan, että Nuristanin hallinto on sitoutunut takaamaan täyden uskonnonvapauden ja yhdenvertaisuuden kaikille kansalaisille.",
            "”Nuristan kuuluu jokaiselle, joka tahtoo rauhaa,” hän sanoi.",
            "Tilanne alueella on vakaa, ja yhteisöt pyrkivät palaamaan normaaliin elämään. Vaikka menneisyyden arvet ovat tuoreita, monet uskovat, että tämä konflikti oli käännekohta – alku uudelle, yhteiselle Nuristanille.",
            "🕊️ NummiNews – Paikan päällä, Nuristanin sydämessä."
        ],
        images: [],
    };

    const kirkkonummiAidArticle: NewsArticle = {
        category: 'Konflikti',
        title: 'Kirkkonummi lähettää sotilaallista ja humanitaarista apua Nuristaniin',
        snippet: 'Kirkkonummi on vahvistanut lähettäneensä alueelle sekä humanitaarista apua että sotilaallista tukea, vastauksena kasvaviin turvallisuushuoliin.',
        imageUrl: 'https://i.postimg.cc/t4cFBw17/2025-10-28-21-19-11.png',
        author: "NummiNews – Kirkkonummi",
        publishedDate: "28.10.2025",
        fullContent: [
            "NURISTAN / KIRKKONUMMI – Nuristanin etelärajalla on havaittu merkittävää liikehdintää ja kiristyvää tilannetta. Kirkkonummi on vahvistanut tänään lähettäneensä alueelle sekä humanitaarista apua että sotilaallista tukea, vastauksena kasvaviin turvallisuushuoliin ja mahdollisiin aseellisiin yhteenottoihin.",
            "KNT (Kirkkonummen Turva) on ilmoittanut siirtäneensä Nuristaniin kuusi panssarivaunua ja kymmenen täysperävaunullista huolto- ja avustusajoneuvoa. Yksiköiden tehtävänä on tukea paikallisia viranomaisia, turvata kriittinen infrastruktuuri ja varmistaa siviiliväestön turvallisuus.",
            "“Presidentti ja Turvallisuus- ja diplomatiaministeriö ovat antaneet käskyn lähettää turvayksiköitä Nuristaniin. Tavoitteena on varmistaa alueen hallinnon toimintakyky ja suojella siviilejä, mikäli aseelliset shia-ryhmät jatkavat uhkailujaan,” totesi KNT:n yleiskomentaja aamun tiedotustilaisuudessa.",
            "KNT:lle on myönnetty virallinen mandaatti ottaa hallintaansa Nuristanin lentokenttä, parlamenttirakennus ja strategiset viestintätornit, jotta viestiyhteydet ja puolustuksen koordinointi säilyvät toimintakykyisinä. Samalla alueelle perustetaan turva- ja puskurivyöhyke, joka suojaa siviiliväestöä mahdollisten iskujen varalta.",
            "Kirkkonummen hallitus painottaa, että operaatio on ennaltaehkäisevä ja humanitaarinen, ei hyökkäys. Tarkoitus on tukea Nuristanin uutta hallintoa ja presidentti Farid al-Naseemia, sekä vakauttaa aluetta, jossa levottomuudet ovat lisääntyneet viime päivinä.",
            "Presidentti al-Naseem on siirtynyt presidentinlinnoitukseen, ja hänen hallituksensa jatkaa toimintaansa turvatoimien alaisena. Samalla on raportoitu, että edesmenneen Ahmad al-Khanin vanhojen kannattajien epäillään kokoavan aseellisia joukkoja rajan läheisyydessä.",
            "Myös Klaani Sanctumin joukot ovat ilmoittaneet olevansa valmiudessa. Heidän kerrotaan odottavan virallista kutsua Nuristanin hallitukselta ennen kuin ryhtyvät toimintaan. Klaanijoukot ovat perinteisesti liikkuneet ratsain ja vankkureilla, ja niitä pidetään alueen kokeneimpina rajavalvontajoukkona.",
            "Diplomaattiset lähteet kertovat, että Kirkkonummen ja Nuristanin välinen puolustus- ja yhteistyösopimus on lähellä ratifiointia, mikä mahdollistaisi tiiviimmän koordinaation molempien hallitusten välillä.",
            "Tilanne on jännitteinen mutta hallinnassa. KNT jatkaa tiedustelua ja turvatoimien vahvistamista, ja viranomaiset kehottavat siviilejä pysymään poissa raja-alueilta toistaiseksi.",
            "🕊️ ”Yhdessä olemme vahvoja.”"
        ],
        images: [],
    };
    
    const nuristanReconstructionArticle: NewsArticle = {
        category: 'Konflikti',
        title: 'Nuristanin jälleenrakennus valmis – uusi presidentti Farid al-Naseem lupaa rauhaa',
        snippet: 'Nuristanin jälleenrakennus on valmis ja kristitty johtaja Farid al-Naseem on nimitetty presidentiksi. Uusi hallinto kohtaa vastustusta, mutta pyrkii rauhaan uskonnollisten johtajien tuella.',
        imageUrl: 'https://i.postimg.cc/prjNYSs3/image.png',
        author: "NummiNews – Kirkkonummi",
        publishedDate: "27.10.2025",
        fullContent: [
            "NURISTAN, 27.10.2025 – Nuristanin jälleenrakennus on saatu päätökseen, ja alueen hallinnossa on uusi presidentti, Farid al-Naseem, joka tunnetaan kristittynä johtajana ja rauhan puolestapuhujana. Presidentti al-Naseem korostaa, että hänen tavoitteensa on yhteiselo eri uskontokuntien kanssa, erityisesti alueen muslimiväestön kanssa, vaikka varsinainen virallinen hallinto ja viranomaisjärjestelmä ovat vasta muodostumassa.",
            "KNT:n turvayksiköt pysyvät alueella tilapäisenä tukena, kunnes Nuristanin omat viranomaiset ja turvallisuusjärjestelyt ovat täysin toimintavalmiita.",
            "Uusi haaste: Shia-muslimien vastustus",
            "Alueella vaikuttaneet edesmenneen Ahmad al-Khanin shia-muslimit vastustavat kristittyjen läsnäoloa Nuristanissa ja ovat ilmoittaneet tukevansa jihadistisia toimia Kirkkonummea vastaan. Tilanne on jännitteinen, ja presidentti al-Naseem on kehottanut maltillisuuteen ja dialogiin.",
            "Uudet uskonnolliset johtajat: Sunni-imami ja kristillinen pappi",
            "Nuristanin muslimiyhteisön uudeksi johtohahmoksi on noussut imami Rashid Omar al-Hafiz, joka yhdessä kristillisen pappi isä Al-Baha Samuelin kanssa rohkaisee Nuristanin kansaa yhdistymään ja puolustamaan aluettaan yhteisvoimin.",
            "”Nuristanin asukkaiden on aika seistä yhdessä – muslimit ja kristityt rinta rinnan – uhkaa vastaan,” toteaa isä Samuel.",
            "Imami al-Hafiz lisää: ”Yhteisymmärrys ja yhteistyö ovat ainoa tie rauhaan ja alueen vakauteen.”",
            "Kristittyjen klaanin tuki",
            "Lähellä sijaitseva kristittyjen klaani on jo ilmaissut valmiutensa tukea Nuristania tarpeen mukaan, mikä antaa alueelle lisäresursseja ja suojaa mahdollisia väkivaltaisia pyrkimyksiä vastaan.",
            "Presidentti Farid al-Naseemin johdolla Nuristanin jälleenrakennus ja turvallisuusjärjestelyt etenevät vaiheittain, ja kansalaisia kehotetaan noudattamaan rauhanomaista yhteistyötä ja seuraamaan virallisia tiedotteita KNT:n ja alueen uskonnollisten johtajien kautta."
        ],
        images: [],
    };

    const investigationArticle: NewsArticle = {
        category: 'Rikos',
        title: 'KNT: epäiltyjen kuulustelut käynnissä – Lehtosen ampumisen epäilty yhä vapaana',
        snippet: 'KNT tiedottaa, että Juha Lehtosta kohtaan tehdyn ampumisen epäilty on edelleen vapaana. Useita henkilöitä on listattu tutkinnan kohteiksi.',
        imageUrl: 'https://i.postimg.cc/02D0cDVW/image.png',
        author: "NummiNews Toimitus",
        publishedDate: "31.10.2025",
        fullContent: [
            "KIRKKONUMMI, KESKUSTA / PAJUMÄKI / SILLANPOHJA – KNT tiedottaa, että Juha Lehtosta kohtaan tehdyn ampumisen epäilty on edelleen vapaana. Tutkintayksiköt eivät vielä vahvista, kuka epäillyistä on suoraan vastuussa, mutta useita henkilöitä on listattu tutkinnan kohteiksi, ja heidän läheisiään kuulustellaan parhaillaan.",
            "Epäillyt henkilöt:",
            "Mikael Rantanen, Veera Heikkilä, Oskari Kallio, Tapio Jokinen, Aapo Lehtimäki, Eero Mäkelä, Joonas Korhonen",
            "KNT:n toimet ja varotoimet:",
            "Kaikki epäiltyihin liittyvien henkilöiden kotitalouksia ja lähipiiriä kuulustellaan.",
            "Keskusta-Pajumäki-Sillanpohja-alueella on lisätty partiointi ja tarkastukset.",
            "Siviilejä kehotetaan pysymään varovaisina ja ilmoittamaan välittömästi havainnoista hätäkeskukseen.",
            "”Emme vielä tiedä, kuka näistä epäillyistä on suoraan vastuussa. Tutkimme tilannetta laaja-alaisesti, ja kaikki havainnot auttavat meitä rajaamaan epäillyt ja turvaamaan kansalaiset,” kommentoi KNT:n päästrategi A. Mannelin.",
            "KNT jatkaa kuulusteluja ja valvontaa koko alueella, ja viranomaiset lupaavat päivityksiä tilanteesta säännöllisesti. Kansalaisia kehotetaan välttämään keskustan, Pajumäen ja Sillanpohjan aluetta siihen asti, kun epäilty saadaan kiinni."
        ],
        images: [],
    };
    
    const kntWarningArticle: NewsArticle = {
        category: 'Rikos',
        title: 'KNT varoittaa: epäilty Lehtosen ampunut henkilö vapaana Kirkkonummen keskustassa',
        snippet: 'KNT varoittaa kansalaisia, että epäilty Juha Lehtosta ampunut henkilö on edelleen vapaana. Hänen liikkumistaan seurataan aktiivisesti keskusta-Pajumäki-Sillanpohja-alueella.',
        imageUrl: 'https://i.postimg.cc/T2yqbdRf/image.png',
        author: "NummiNews Toimitus",
        publishedDate: "31.10.2025",
        fullContent: [
            "KIRKKONUMMI, KESKUSTA / PAJUMÄKI / SILLANPOHJA – KNT varoittaa kansalaisia, että epäilty Juha Lehtosta ampunut henkilö on edelleen vapaana. Ensimmäiset havainnot epäillystä on kirjattu klo 17.32, ja hänen liikkumistaan seurataan aktiivisesti keskusta-Pajumäki-Sillanpohja-alueella.",
            "KNT kehottaa kaikkia välttämään kyseistä aluetta ja ilmoittamaan epäilyttävistä havainnoista välittömästi hätäkeskukseen.",
            "Aseen tiedot ja mahdollinen motiivi",
            "Epäilty on raportoitu kantaneen FAMAE SAF -konepistoolia. Tutkintalähteiden mukaan uhri, Juha Lehtonen, oli aiemmin Kaivoskaupungissa velkainen huumeiden käytön vuoksi, mikä voi liittyä mahdolliseen motiiviin. Kaivoskaupungissa huumeiden ja alkoholin käyttö oli yleistä, osin raskaan kaivostyön ja tiiviin betonirakenteen vuoksi, ja tämä historia saatetaan liittää nykyiseen tapahtumaan.",
            "KNT:n toimet",
            "Alueella on voimassa välitön liikkumisrajoitus, ja kaikki siviilit ohjataan sivuun vaaravyöhykkeeltä.",
            "Tutkintayksiköt suorittavat valvontaa ja tarkastuksia kaikilla merkittävillä reiteillä keskustasta Pajumäen ja Sillanpohjan kautta.",
            "Kaikki alueella havaitut epäilyttävät henkilöt pidätetään väliaikaisesti tarkistuksia varten.",
            "KNT painottaa, että tapaus on erittäin vakava, ja kansalaisia pyydetään noudattamaan viranomaisten ohjeita. Kaikki havainnot epäillystä henkilön liikkeistä auttavat nopeuttamaan hänen kiinniottamistaan ja estämään lisävahinkoja.",
            "”Tilanne on kriittinen. Emme tiedä, mihin epäilty on menossa seuraavaksi, joten turvallisuus on etusijalla. Kehotamme kaikkia pysymään sisätiloissa ja ilmoittamaan epäilyttävistä liikkeistä heti,” kommentoi KNT:n päästrategi A. Mannelin.",
            "KNT jatkaa tutkimuksia ja valvontaa yötä päivää, ja virallisia lisäpäivityksiä julkaistaan tunnin välein NummiNewsin hätälähetyksissä."
        ],
        images: [],
    };

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
            "Maanmittausoperaatio jatkuu, ja lisätietoja odotetaan lähiviikkoina, kun tarkemmat analyysit ja kartoitukset valmistuvat. Tilanne herättää kiinnostusta niin arkkitehtien, insöörien kuin kaupungin suunnittelijoiden keskuudessa."
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
            "Tilanne Niilikylän ympäristössä on yhä äärimmäisen jännitteynyt, ja lisätietoja odotetaan seuraavien tuntien aikana."
        ],
        images: [],
    };

    const welcomeArticle: NewsArticle = {
        category: 'Uutinen',
        title: 'NummiNews on auki!',
        snippet: 'Kauan odotettu sivuston toinen versio on vihdoin täällä! Tutustu uusiin ominaisuuksiin ja moderniin ulkoasuun.',
        imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAHSA8gDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1VldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA-MiI1IcbBUnz2/gq3K//wB2/gYIq2V/+7fwH8W//wDKl/gf9q3//AJUv8D/tVw/7S/wP+23D/wDS/wAB/Wrf/wDlS/wH/W3B/wBr/gP/AH9x/wDkf4D/AL/cR/8AI/wH/AH/xH/In+B/3+xP/AJA/wH/AZif8g/wD/gMxf/kD/wAA/wCBmL/yB/4H/gSi/wCQf+B/4EY/+Q/8D/gRj/8Ay/wH/gRj/wD/AAP/AAVj/8v/AID/AMFY/wD5f4D/AMFY/wD5fwP/AAbD/wB//gP/AAbf+j/A/wCDf+D/AAH/AIN/wf+B/wCDi/+CP/gf+DiX/gj/AMH/g4v/AOCf/wAD/g3j/wD4n/A/+DeP/wDk/gf+DeT/AJD/AMH/g1/8B/wAH/g1/wL+D/wAGP8H/gP8Agy/g/wDAf+DD+A/wH/hf/AOD/gH/DP/AOH/APA/8M/+H/gP+F/gf+Gf4H/h/wP/AAf8Ef8AD/wf+Af8H/gH/B/wD+D/g/8A//Z',
        author: "NummiNews Toimitus",
        publishedDate: "24.10.2024",
        fullContent: [
            "Tervetuloa NummiNewsin uudelle sivustolle! Olemme tehneet kovasti töitä tarjotaksemme teille paremman ja sujuvamman käyttökokemuksen. Uusi sivusto on suunniteltu moderniksi ja helppokäyttöiseksi kaikilla laitteilla.",
            "Toivomme, että nautitte uudesta ulkoasusta ja parannetuista ominaisuuksista. Palautteenne on meille tärkeää, joten kertokaa meille, mitä mieltä olette!",
            "Tämä on uuden aikakauden alku NummiNewsille, ja olemme innoissamme siitä, mitä tulevaisuus tuo tullessaan. Pysykää kuulolla!"
        ],
        images: [
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADvAQIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1VldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA-MiI1IcbBUnz2/gq3K//wB2/gYIq2V/+7fwH8W//wDKl/gf9q3//AJUv8D/tVw/7S/wP+23D/wDS/wAB/Wrf/wDlS/wH/W3B/wBr/gP/AH9x/wDkf4D/AL/cR/8AI/wH/AH/xH/In+B/3+xP/AJA/wH/AZif8g/wD/gMxf/kD/wAA/wCBmL/yB/4H/gSi/wCQf+B/4EY/+Q/8D/gRj/8Ay/wH/gRj/wD/AAP/AAVj/8v/AID/AMFY/wD5f4D/AMFY/wD5fwP/AAbD/wB//gP/AAbf+j/A/wCDf+D/AAH/AIN/wf+B/wCDi/+CP/gf+DiX/gj/AMH/g4v/AOCf/wAD/g3j/wD4n/A/+DeP/wDk/gf+DeT/AJD/AMH/g1/8B/wAH/g1/wL+D/wAGP8H/gP8Agy/g/wDAf+DD+A/wH/hf/AOD/gH/DP/AOH/APA/8M/+H/gP+F/gf+Gf4H/h/wP/AAf8Ef8AD/wf+Af8H/gH/B/wD+D/g/8A//Z',
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADvAQIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1VldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA-MiI1IcbBUnz2/gq3K//wB2/gYIq2V/+7fwH8W//wDKl/gf9q3//AJUv8D/tVw/7S/wP+23D/wDS/wAB/Wrf/wDlS/wH/W3B/wBr/gP/AH9x/wDkf4D/AL/cR/8AI/wH/AH/xH/In+B/3+xP/AJA/wH/AZif8g/wD/gMxf/kD/wAA/wCBmL/yB/4H/gSi/wCQf+B/4EY/+Q/8D/gRj/8Ay/wH/gRj/wD/AAP/AAVj/8v/AID/AMFY/wD5f4D/AMFY/wD5fwP/AAbD/wB//gP/AAbf+j/A/wCDf+D/AAH/AIN/wf+B/wCDi/+CP/gf+DiX/gj/AMH/g4v/AOCf/wAD/g3j/wD4n/A/+DeP/wDk/gf+DeT/AJD/AMH/g1/8B/wAH/g1/wL+D/wAGP8H/gP8Agy/g/wDAf+DD+A/wH/hf/AOD/gH/DP/AOH/APA/8M/+H/gP+F/gf+Gf4H/h/wP/AAf8Ef8AD/wf+Af8H/gH/B/wD+D/g/8A//Z',
            'https://i.postimg.cc/Vk1XhH10/image.png'
        ],
    };

    const importantNews: NewsArticle[] = [maroviaNovaArticle, niilikylaReconstructionArticle, kntGreatBattleVictoryArticle, nuristanMuslimsReportArticle, kirkkonummiAidArticle, nuristanReconstructionArticle, investigationArticle, kntWarningArticle, lehtonenArticle, downtownLivingArticle, airPocketsArticle];
    const allNews: NewsArticle[] = [maroviaNovaArticle, niilikylaReconstructionArticle, kntGreatBattleVictoryArticle, nuristanMuslimsReportArticle, kirkkonummiAidArticle, nuristanReconstructionArticle, investigationArticle, kntWarningArticle, lehtonenArticle, downtownLivingArticle, airPocketsArticle, metroArticle, kntVictoryArticle, nuristanArticle, welcomeArticle];

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
            <Ticker articles={importantNews} />
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