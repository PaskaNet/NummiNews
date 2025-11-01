
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

const Ticker: React.FC<{ articles: NewsArticle[]; className?: string }> = ({ articles, className }) => {
    const tickerItems = articles.map(article => article.title);
    return (
        <div className={`ticker-bar ${className || ''}`}>
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

    const maroviaWarEscalatesArticle: NewsArticle = {
        category: 'Konflikti',
        title: 'NUMMINEWS – MAROVIAN SOTA PAHENEE: KHALIMASTA LAUKAISTUT OHJUKSET ISKIVÄT LEMBURAAN, SATOJA KUOLLUT',
        snippet: 'Marovian sisällissota on siirtynyt uuteen, tuhoisaan vaiheeseen. Khaliman alueelta on laukaistu useita ohjuksia kohti Keski-Marovian Lemburaa.',
        imageUrl: 'https://i.postimg.cc/KYRtbGBT/image.png',
        author: "NummiNews-toimitus",
        publishedDate: "1.11.2025",
        fullContent: [
            "Marovian sisällissota on siirtynyt uuteen, tuhoisaan vaiheeseen. Khaliman alueelta on laukaistu useita ohjuksia kohti Keski-Marovian Lemburaa. Virallisten lähteiden mukaan kolme ohjusta osui suoraan Lemburan keskustaan aiheuttaen mittavia tuhoja ja laajoja metsäpaloja kaupungin ympäristössä.",
            "Ensimmäiset raportit kertovat vähintään 293 kuolleesta ja useista sadoista loukkaantuneista. Uhrien joukossa on siviilejä, mukaan lukien pakolaisperheitä, jotka olivat hakeutuneet Lemburaan turvaan aiemmista taisteluista.",
            "”Tämä oli brutaali ja suunnitelmallinen hyökkäys siviilikohteita vastaan. Lembura palaa, ja ambulanssit eivät riitä,” kertoi paikallinen pelastustyöntekijä puhelinhaastattelussa.",
            "Palot syttyivät ohjusten iskettyä kaupungin teollisuusalueelle ja pohjoisosiin. Savupilvet näkyvät kymmenien kilometrien päähän, ja paikalliset viranomaiset ovat pyytäneet apua Nova-liitolta ja Kirkkonummen hätäyksiköiltä.",
            "Khaliman johto ei ole toistaiseksi kommentoinut hyökkäystä, mutta Lemburan sotilasneuvosto on julistanut täyden hätätilan ja aloittanut vastatoimien valmistelut. Nova-liiton diplomaatit ovat kutsuneet tilanteen ”selväksi sodan eskalaatioksi” ja vaatineet kansainvälisen yhteisön puuttumista.",
            "”Hyökkäys osoittaa, että Khaliman komento toimii ilman mitään pidäkkeitä. Humanitaarinen tilanne romahtaa tunneissa, ellei apua saada heti,” totesi Nova-liiton edustaja Sembirasta.",
            "Lemburan sairaalat ovat ylikuormitettuja, ja sähkökatkot vaikeuttavat pelastustöitä. KNV on vahvistanut vastaanottaneensa satelliittikuvia paloista ja tuhoalueista, ja alustavien analyysien mukaan iskuissa käytettiin lyhyen kantaman raketteja tai kotitekoisia ohjuksia.",
            "Tilanne Lemburassa on kaoottinen, ja viranomaiset varoittavat uusia iskuja mahdollisiksi. Nova-liitto ja Kirkkonummi seuraavat kehitystä tiiviisti ja harkitsevat humanitaarisen avun lähettämistä välittömästi alueelle.",
            "🌍 NUMMINEWS seuraa kriisin etenemistä hetki hetkeltä – lisää päivityksiä Lemburan tapahtumista illan aikana."
        ],
        images: [null, null, null, null, null, null, null, null, null],
    };

    const maroviaCivilWarArticle: NewsArticle = {
        category: 'Konflikti',
        title: 'NUMMINEWS – MAROVIA AJAUTUNUT SISÄLLISSOTAAN: KESKI- JA ETELÄMAROVIA KOHTAAVAT ASEELLISET YHTEENOTOT',
        snippet: 'Marovia on ajautunut laajenevaan sisäiseen konfliktiin. Maa on käytännössä jakautunut kolmeen vyöhykkeeseen, ja tilanne eskaloituu aseellisiksi yhteenotoiksi.',
        imageUrl: 'https://i.postimg.cc/mktFrNgK/image.png',
        author: "NummiNews-toimitus",
        publishedDate: "31.10.2025",
        fullContent: [
            "Marovia on ajautunut laajenevaan sisäiseen konfliktiin. Maa on käytännössä jakautunut kolmeen vyöhykkeeseen: Pohjois-Maroviaan (Pohjoismarovian liitto), Keski-Maroviaan (Lembura) ja Etelä-Maroviaan (Khalima). Tilanne on eskaloitumassa aseellisiksi yhteenotoiksi erityisesti Lemburan ja Khaliman välillä.",
            "Pohjois-Marovia hallitsee valtaosan infrastruktuurista ja on liittoutunut Kirkkonummen Nova-liiton kanssa. Khalima puolestaan vaatii täydellistä itsenäisyyttä ja on mobilisoinut merkittäviä joukkoja, joita johtaa Alkan E. Gahmar. Lembura on ryhtynyt puolustustoimiin ja valmistelee vastatoimia.",
            "”Tilanne on vakava, ja alueella raportoidaan useita aseellisia yhteenottoja, pommi-iskuja ja tienmurhia. Siviilit kärsivät merkittävästi,” kertoo paikallinen viranomaislähde.",
            "Tilannekuva ja vaikutukset:",
            "Aseelliset yhteenotot: Lembura–Khalima -alueella useita pommi-iskuja ja salamurhia.",
            "Joukkojen koko: Khaliman asevoimat arviolta 3 000–10 000 taistelijaa; Lemburan ja Keski-Marovian joukot mobilisoituvat mutta kärsivät raskaasta kalustosta.",
            "Aseistus: Khalima käyttää tuliaseita, raketteja ja paikallisvalmisteisia panssarintorjuntavälineitä. Raskaammat aseet puuttuvat.",
            "Siviilit: Humanitaarinen kriisi kärjistymässä Keski-Maroviassa; ruoka-, vesi- ja lääkehuolto katkolla. Pakolaisvirrat odotettavissa Pohjois-Maroviaan.",
            "Diplomatia ja riskit:",
            "Pohjois-Marovia toimii Nova-liiton yhteyksissä, mutta Khalima kieltäytyy liitosta ja vastustaa Kirkkonummen vaikutusta. Konfliktin laajentuminen pohjoiseen voi johtaa valtiolliseen sotaan Kirkkonummen johdolla, ja Lemburan hyökkäykset Khalimaan tai Khaliman suuret iskut voivat laukaista täyspainoisen sisällissodan.",
            "”Presidentin salalento Kirkkonummeen neuvotteluja varten on korkean riskin operaatio,” varoittaa NummiNews-lähde.",
            "Mahdolliset kehityskulut:",
            "Lembura aloittaa hyökkäyksen Khalimaan → laajempi sisällissota (korkea riski).",
            "Khalima provosoi pohjoista infrastruktuuria vastaan → Kirkkonummi reagoi (keskisuuri–korkea riski).",
            "Lyhytkestoinen sovittelu kansainvälisen välittäjän kautta → tilanne pysyy jännittyneenä mutta vähemmän verisenä (matala–keskisuuri riski).",
            "Marovian konflikti on nopeasti kehittyvä ja vakava. Siviilien suojeleminen ja humanitaarisen avun toimittaminen ovat kriittisiä. Nova‑liiton ja alueellisten välittäjien kiireellinen osallistuminen voisi edelleen estää laajamittaisen sodan, mutta aika on rajallinen.",
            "🌐 NUMMINEWS seuraa tilannetta reaaliaikaisesti ja raportoi kaikista merkittävistä kehityksistä Marovian kriisialueilla."
        ],
        images: [
            null,
            null,
            null,
            'https://i.postimg.cc/Zn7F75Wn/image.png',
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
    };
    
    const satelliteArticle: NewsArticle = {
        category: 'Paikallinen',
        title: 'NUMMINEWS – KNV:N SATELLIITTI HAVAINNUT MAHDOLLISESTI KIRKKONUMMEN ILMAVOIMIEN KONEEN TUNTOMERKIT TÄYTTÄVÄN ROMUN',
        snippet: 'KNV:n satelliitti on havainnut lentokoneen romun syrjäisellä alueella, joka saattaa kuulua Kirkkonummen ilmavoimille. Yhteinen tutkimusoperaatio on käynnistetty.',
        imageUrl: 'https://i.postimg.cc/fyv1zc1g/image.png',
        author: "NummiNews Toimitus",
        publishedDate: "1.11.2025",
        fullContent: [
            "KIRKKONUMMI / MAROVIAN RAJASEUTU – KNV:n satelliittikuvausjärjestelmä havaitsi torstain ja perjantain välisenä yönä kolaroituneen lentokoneen jäännökset syrjäiseltä alueelta, satojen kilometrien päässä Maroviasta ja useiden tuhansien kilometrien päässä Kirkkonummesta. Alustavien analyysien perusteella kone vaikuttaa kuuluneen Kirkkonummen ilmavoimille, mutta virallista vahvistusta ei ole vielä saatu.",
            "Havainto tehtiin osana KNV:n rutiininomaista satelliittiseurantaa, joka kartoittaa liittouman alueita ja valvoo lentoliikennettä NOVA-liiton ilmatiloissa. Kuvissa näkyy osittain metsittyneelle alueelle hajonnut koneen runko, josta erottuu Kirkkonummen ilmavoimien tunnuksiin viittaavia värimerkintöjä.",
            "”Kuvamateriaali on selkeää, ja useat yksityiskohdat viittaavat siihen, että kyseessä voisi olla Kirkkonummen ilmavoimien kone. Emme kuitenkaan voi tehdä lopullisia johtopäätöksiä ennen kuin tutkijaryhmämme saavuttaa paikan,” kertoi KNV:n satelliittivalvontakeskuksen pääinsööri varhain lauantaiaamuna.",
            "Kirkkonummen hallitus ja KNT ovat kumpikin ilmoittaneet käynnistävänsä yhteisen tutkimusoperaation. Tutkijoita ja sotilashenkilöstöä on määrä lähettää paikalle lähivuorokauden aikana selvittämään koneen alkuperää, mahdollisia uhreja sekä onnettomuuden syytä.",
            "KNT:n komentokeskus on korostanut, että turvallisuussyistä operaation yksityiskohtia ei julkisteta, mutta Kirkkonummi on yhteydessä sekä Marovian että NOVA-liiton viranomaisiin koordinoidun tutkimuksen varmistamiseksi.",
            "”Kyseessä on mahdollisesti merkittävä tapaus, joka liittyy ilmavoimiemme historiaan ja turvallisuuteen. Meidän on toimittava varoen mutta päättäväisesti,” todettiin KNT:n lyhyessä lausunnossa.",
            "🌐 NUMMINEWS seuraa tilannetta reaaliaikaisesti ja raportoi, kun tutkimusryhmä saavuttaa alueen ja ensimmäiset havainnot vahvistetaan."
        ],
        images: [],
    };

    const fusionReactorArticle: NewsArticle = {
        category: 'Teknologia',
        title: 'NUMMINEWS – KNV:N FUUSIOREAKTORI VALMISTAUTUU KOKEILUUN',
        snippet: 'KNV:n fuusioreaktorin demoyksikkö valmistautuu aloittamaan kokeellisen toiminnan Lahden varastossa, mikä on merkittävä askel kohti puhtaampaa energiaa.',
        imageUrl: 'https://i.postimg.cc/j57Zhh50/2025-04-07-21-20-41.png',
        author: "NummiNews Toimitus",
        publishedDate: "30.10.2025",
        fullContent: [
            "KIRKKONUMMI – Kirkkonummen infrastruktuuri- ja energiateknologiayhtiö KNV ilmoittaa, että sen fuusioreaktorin demoyksikkö, joka rakennettiin ennen Lahden alueen valtausta ja siirrettiin myöhemmin Lahden varastoon, valmistautuu aloittamaan kokeellisen toiminnan lähiaikoina.",
            "KNV:n mukaan fuusioreaktori on tarkoitettu tutkimus- ja kehityskäyttöön, ja sen tarkoituksena on testata uusia energiateknologioita, jotka voisivat tulevaisuudessa tarjota puhdasta ja tehokasta sähköntuotantoa Kirkkonummen tarpeisiin.",
            "”Demo on ollut valmiustilassa siirron jälkeen, ja nyt olemme saavuttaneet vaiheen, jossa voimme käynnistävänsä kokeellisen toiminnan. Tämä on merkittävä askel kohti puhtaampaa ja itsenäisempää energiantuotantoa,” kommentoi KNV:n energiateknologiayksikön johtaja.",
            "KNV ei ole vielä antanut aikataulua täydelle tuotantokapasiteetille, mutta lupaa, että kokeet toteutetaan turvallisesti ja vaiheittain valvotussa ympäristössä Lahden varastossa.",
            "Yhtiö odottaa kokeiden antavan arvokasta tietoa fuusioteknologian soveltamisesta sekä mahdollisista tulevista laajemmista energiainvestoinneista Kirkkonummen eri alueille.",
            "🌐 NUMMINEWS – seuraa fuusioreaktorin kokeita ja KNV:n energiahankkeita reaaliaikaisesti."
        ],
        images: [],
    };

    const kntRevenueArticle: NewsArticle = {
        category: 'Talous & Politiikka',
        title: 'NUMMINEWS – KNT:N LIIKEVAIHTO NOUSI HUIMASTI NURISTANIN OPERAATION JÄLKEEN',
        snippet: 'KNT raportoi merkittävästä liikevaihdon kasvusta vuoden 2025 viimeisellä neljänneksellä, erityisesti Nuristanin operaation seurauksena.',
        imageUrl: 'https://i.postimg.cc/J4GtYd8H/image.png',
        author: 'NummiNews Toimitus',
        publishedDate: '5.11.2025',
        fullContent: [
            "KIRKKONUMMI – Kirkkonummen Turva (KNT) raportoi merkittävästä liikevaihdon kasvusta vuoden 2025 viimeisellä neljänneksellä. Liikevaihto on noussut operatiivisten tehtävien, erityisesti Nuristanin humanitaarisen ja sotilaallisen tuen, seurauksena.",
            "KNT:n toimitusjohtaja kommentoi: ”Nuristanin operaation myötä toimintamme laajuus ja näkyvyys kasvoivat huomattavasti. Tämä näkyy suoraan liikevaihdossa sekä tulevissa tilauksissa.”",
            "Yrityksen tilinpäätöksen ennakkotietojen mukaan liikevaihto nousi noin 45 prosenttia edellisvuoteen verrattuna. Tämä tarkoittaa noin 9,2 miljardia KD vuoden viimeisellä neljänneksellä, kun edellisen vuoden vastaava luku oli noin 6,35 miljardia KD.",
            "Kasvuun vaikutti erityisesti:",
            "KNT:n operatiivisten yksiköiden laajennus Nuristanin alueella",
            "Uudet turvasopimukset paikallishallinnon ja strategisten kohteiden kanssa",
            "Koulutus- ja logistiikkapalveluiden myynti liittolaisvaltioille NOVA-liiton puitteissa",
            "KNT:n yleiskomentaja lisäsi: ”Kasvu antaa meille mahdollisuuden vahvistaa valmiutta, kehittää teknologiaa ja investoida henkilöstön koulutukseen – kaikki tämä tukee Kirkkonummen turvallisuutta pitkällä aikavälillä.”",
            "🌐 NUMMINEWS – seuraa KNT:n kehitystä ja alueellista turvallisuustoimintaa reaaliaikaisesti."
        ],
        images: []
    };

    const itaniemiReconstructionArticle: NewsArticle = {
        category: 'Jälleenrakennus',
        title: 'NUMMINEWS – ITÄNIEMEN JÄLLEENRAKENNUS ALKANUT: TEOLLISUUS KORVAA KONFLIKTIN KUSTANNUKSET',
        snippet: 'Itäniemen alueella on käynnistetty laaja jälleenrakennusprojekti, jonka tavoitteena on kattaa aiemmasta konfliktista aiheutuneet kustannukset uudella teollisuusalueella.',
        imageUrl: 'https://i.postimg.cc/4yp2X1kV/2025-03-23-21-31-43-2.png',
        author: 'NummiNews Toimitus',
        publishedDate: '4.11.2025',
        fullContent: [
            "KIRKKONUMMI / ITÄNIEMI – Itäniemen alueella on käynnistetty laaja jälleenrakennusprojekti. KNV johtaa hanketta, jonka tavoitteena on rakentaa uutta teollisuusaluetta alueelle, jotta voidaan kattaa Itäniemen aiemmasta konfliktista aiheutuneet kustannukset.",
            "“Rakennamme Itäniemeen kestävää teollisuuskapasiteettia, joka tukee sekä taloutta että alueen elinvoimaa,” kertoi KNV:n projektijohtaja tiedotteessa.",
            "Rakennustyöt ovat jo käynnissä, ja alueelle on suunnitteilla sekä tuotantolaitoksia että logistiikkakeskuksia. KNV:n mukaan teollisuus tuottaa merkittävää tulovirtaa, joka kattaa velan Itäniemen konfliktista aiheutuneista menetyksistä.",
            "KNT on ottanut tiukat otteet alueen vartioinnissa. Alueella liikkuu lukuisia KNT:n yksiköitä, jotka valvovat sekä rakennustyömaata että lähialueita, jotta projekti voidaan toteuttaa turvallisesti ja ilman häiriöitä.",
            "Itäniemen jälleenrakennus on osa laajempaa strategiaa, jolla Kirkkonummi pyrkii palauttamaan alueiden taloudellisen toiminnan ja turvaamaan pitkäaikaisen vakauden konfliktialueilla."
        ],
        images: []
    };

    const maroviaNetworkArticle: NewsArticle = {
        category: 'Teknologia',
        title: 'KNV JA MAROVIA YHDISTÄVÄT VOIMANSA: UUSI LANGATON VERKKOYHTEYS SUUNNITTEILLA',
        snippet: 'KNV suunnittelee teknistä yhteistyötä Marovian kanssa langattomien verkkoyhteyksien parantamiseksi, sisältäen 2G, 3G ja 4G -ratkaisuja.',
        imageUrl: 'https://i.postimg.cc/L5JQGMvQ/image.png',
        author: 'NummiNews',
        publishedDate: '3.11.2025',
        fullContent: [
            "KIRKKONUMMI / MAROVIA – Kirkkonummen valtion infrastruktuuriyhtiö KNV on ilmoittanut suunnittelevansa teknistä yhteistyötä Marovian kanssa, joka keskittyy langattomien verkkoyhteyksien parantamiseen alueiden välillä. Hanke sisältää useita verkko- ja linkkiratkaisuja, joiden avulla pyritään parantamaan niin kotien kuin julkisten palvelujen tiedonsiirtoa.",
            "KNV:n mukaan tarjolle tulee seuraavat yhteydet:",
            "2G Glink – peruspuhelin- ja viestintäyhteydet",
            "3G-S ja 3G-K – kodin WiFi:n tukiyhteydet oikealla vahvistimella",
            "4G Suite LongLink – julkinen mobiilidata-ilman 5G-tukea",
            "“Hanke mahdollistaa toimivat ja luotettavat yhteydet Marovian ja Kirkkonummen välillä. Emme tarjoa 4G Advancedia, 5G- tai 5G+-yhteyksiä, mutta 3G- ja 4G-ratkaisut takaavat riittävän nopeuden kodin WiFille sekä julkisen mobiilidatan,” kertoi KNV:n verkko-osaston johtaja tiedotteessa.",
            "Suunnitelmissa on hyödyntää Casinon läheistä mastoa ja rakentaa kaksi uutta linkkitornia Kirkkonummen ja Marovian välille. Hanke toteutetaan KNV:n itsenäisesti, ja KirkNet ei ole mukana sopimuksessa tai toteutuksessa.",
            "KNV:n mukaan linkkitorneilla varmistetaan paitsi vakaa tiedonsiirto, myös mahdollisuus tuleville laajennuksille ilman nykyisten palveluiden häiriöitä.",
            "Rakentamisen ja testauksen aikataulu tarkentuu lähiviikkoina, ja NummiNews seuraa hankkeen etenemistä läheltä.",
            "🌐 NUMMINEWS – pysy kuulolla KNV:n ja Marovian verkkoyhteistyön kehityksestä."
        ],
        images: []
    };
    
    const nuclearPlantArticle: NewsArticle = {
        category: 'Paikallinen',
        title: 'KNV SUUNNITTELEE YDINVOIMALAA ETELÄRANTAAN',
        snippet: 'Kirkkonummen infrastruktuuriyhtiö KNV on aloittanut suunnittelutyön uuden pienydinvoimalan sijoittamiseksi Etelärantaan, tavoitteenaan energiaomavaraisuuden vahvistaminen.',
        imageUrl: 'https://i.postimg.cc/50L6gHMt/image.png',
        author: "NummiNews",
        publishedDate: "3.11.2025",
        fullContent: [
            "KIRKKONUMMI / ETELÄRANTA – Kirkkonummen valtion omistama infrastruktuuriyhtiö KNV on ilmoittanut aloittaneensa suunnittelutyön uuden ydinvoimala-alueen sijoittamiseksi Etelä-Kirkkonummen rannikolle. Hanke on osa pitkän aikavälin energiaomavaraisuusohjelmaa, jolla pyritään turvaamaan Kirkkonummen kasvavan väestön ja teollisuuden sähköntarve seuraaviksi vuosikymmeniksi.",
            "KNV:n lausunnon mukaan suunnittelussa korostetaan turvallisuutta, kestävää teknologiaa ja paikallista energiaomavaraisuutta. Mahdollinen sijaintipaikka on alustavasti määritelty Etelärannan satama-alueen ja vanhan varastokentän välille, jonne on jo rakennettu osia energiaverkon päälinjoista.",
            "“Tavoitteemme on luoda tehokas ja turvallinen voimalaitos, joka hyödyntää uusinta sukupolvea edustavaa pienydinreaktoriteknologiaa. Tämä hanke on välttämätön, jotta voimme turvata energian hinnan ja huoltovarmuuden pitkällä aikavälillä,” kertoi KNV:n toimitusjohtaja aamun tiedotteessa.",
            "Rakennuspaikan esiselvitys on käynnissä, ja viralliset ympäristöarvioinnit alkavat vuoden 2026 alussa. Etelärannan valtuusto on ilmaissut varauksellisen tukensa hankkeelle, mutta vaatinut tarkkoja turvallisuustakuita ennen rakentamisluvan myöntämistä.",
            "Asukkaiden keskuudessa reaktiot ovat vaihtelevia: osa näkee projektin mahdollisuutena vahvistaa paikallista taloutta ja työpaikkoja, kun taas toiset suhtautuvat huolestuneesti laitoksen sijoittamiseen asutuksen lähelle.",
            "“Jos tämä toteutetaan vastuullisesti, se voi olla valtava askel kohti energiaitsenäisyyttä,” kommentoi Etelärannan aluejohtaja NummiNewsille.",
            "Rakentamisen arvioidaan alkavan aikaisintaan vuonna 2027, ja valmistumisen sijoittuvan 2030-luvun alkuun.",
            "⚙️ FAKTAT: KNV:n ydinvoimala-hanke:",
            "Sijainti: Etelä-Kirkkonummi, satama-alueen pohjoispuoli",
            "Teknologia: pienydinreaktori (SMR)",
            "Kapasiteetti: noin 1,2 GW",
            "Tavoite: energiaomavaraisuus ja teollisuuden tukeminen",
            "Rakennusvaihe: suunnittelu / esiselvitys",
            "🌐 NUMMINEWS seuraa hankkeen etenemistä ja julkaisee ensimmäiset luonnoskuvat, kun ne valmistuvat."
        ],
        images: [],
    };

    const koicuMurderArticle: NewsArticle = {
        category: 'Rikos',
        title: 'NUMMINEWS – SÄHKÖISKU KOICU: AMATÖÖRIRADION HARRASTAJA MURHATTU, ESIIN NOUSI TUNNETTU SÄHKÖALAN MIES',
        snippet: 'Kirkkonummella tapahtui myöhään lauantai-iltana järkyttävä väkivallanteko. Sähköalalla tunnettu työntekijä ja aktiivinen amatööriradion harrastaja, Koicu, on löydetty kuolleena kotinsa lähistöltä.',
        imageUrl: 'https://i.postimg.cc/sX02fVck/2025-10-30-22-29-10.png',
        author: "NummiNews Toimitus",
        publishedDate: "2.11.2025",
        fullContent: [
            "ETELÄRANTA / KIRKKONUMMI – Kirkkonummella tapahtui myöhään lauantai-iltana järkyttävä väkivallanteko. Sähköalalla tunnettu työntekijä ja aktiivinen amatööriradion harrastaja, Koicu, on löydetty kuolleena kotinsa lähistöltä epäselvissä olosuhteissa.",
            "KNT:n tutkintayksikön mukaan kyseessä on murhaksi luokiteltava tapaus, ja tutkinta on käynnissä usealla eri linjalla. Tapauksessa ei tällä hetkellä epäillä poliittista motiivia, mutta KNT ei sulje mitään vaihtoehtoja pois.",
            "“Kyseessä on arvostettu yhteisön jäsen, joka oli monille tuttu radiotaajuuksilta ja vapaaehtoistyöstään sähköverkon kunnossapidossa. Tutkinta etenee, ja toivomme yleisöltä havaintoja Etelärannan ja mastoalueen ympäristöstä illan ja yön ajalta,” totesi KNT:n tiedottaja sunnuntaiaamuna.",
            "Koicu oli aktiivinen jäsen useissa harrastajaryhmissä ja osallistui aiemmin useisiin Kirkkonummen sähköverkon testausprojekteihin vapaaehtoisena. Hänen työtoverinsa kuvaavat häntä “hiljaiseksi, mutta nerokkaaksi mieheksi, joka rakasti radiota ja valoa.”",
            "Tragedian jälkeen Etelärannan radiomaston juurelle on sytytetty muistovalot, jotka valaisevat iltaisin maston alaosaa sinertävällä hehkulla. Useat amatööriradion ystävät ovat kokoontuneet paikalle muistamaan Koicua ja lähettämään viimeisen “CQ”-viestin hänen kunniakseen.",
            "“Hän rakensi yhteyksiä, kirjaimellisesti ja henkisesti. Nyt masto valaisee hänen muistoaan,” sanoi yksi Koicun ystävistä paikalla järjestetyssä hiljaisessa muistotilaisuudessa.",
            "🕯 NUMMINEWS seuraa tutkinnan etenemistä. KNT pyytää edelleen havaintoja alueelta, erityisesti Etelärannan sataman ja radiomaston väliltä kello 21.00–23.30 välisenä aikana."
        ],
        images: [],
    };

    const electionArticle: NewsArticle = {
        category: 'Politiikka',
        title: 'NUMMINEWS – OSAVALTIOVAALIT 2025: PYHÄ KOALITIO PITÄÄ PINTANSA',
        snippet: 'Kirkkonummen seitsemän osavaltiota ovat päättäneet uusista valtuustoistaan. Tulokset vahvistavat Pyhän Koalition asemaa.',
        imageUrl: 'https://i.postimg.cc/9MMG2Dfr/Screenshot-2025-10-30-16-07-00-73-680d03679600f7af0b4c700c6b270fe7.jpg',
        author: "NummiNews",
        publishedDate: "30.10.2025",
        fullContent: [
            "Kirkkonummen seitsemän osavaltiota ovat päättäneet uusista valtuustoistaan. Äänestysaktiivisuus oli poikkeuksellisen korkea, ja tulokset vahvistavat Pyhän Koalition (LibCon, Kristillinen Oikeisto ja Kristillinen Keskusta) asemaa. SDP nousi selvästi erityisesti työläisalueilla, kun taas Vihreä Liitto jäi marginaaliin, mutta säilytti asemansa yliopistokaupungeissa.",
            "Uusikaupunki pysyi LibConin vahvana linnakkeena. Alueen taloudellinen vapaus ja yrittäjyysvetoinen ilmapiiri säilyivät äänestäjien suosiossa. Tulos: LibCon 3, Kristillinen Keskusta 1, SDP 1.",
            "Vanhakaupunki säilytti asemansa konservatiivisena sydämenä. Kristillinen Oikeisto otti ylivoimaisen voiton ja muodostaa enemmistöhallituksen yhdessä Keskustan kanssa. Tulos: Kristillinen Oikeisto 4, Kristillinen Keskusta 2, LibCon 1.",
            "Sillanpohja pysyi tiukasti LibConin hallinnassa. Nollaveropolitiikka ja vahva markkinatalous saivat laajaa kannatusta. Tulos: LibCon 3, SDP 1, Vihreä Liitto 1.",
            "Eteläranta jatkoi satama- ja kauppakeskuksena LibConin johdolla. Alueen meriteollisuus ja yrityssektori antoivat vahvan tuen hallitukselle. Tulos: LibCon 3, Kristillinen Oikeisto 1, SDP 1.",
            "Lahti osoittautui poliittiseksi keinulaudaksi. Kristillinen Keskusta nousi suurimmaksi puolueeksi ja muodosti poikkeuksellisesti yhteistyöhallituksen SDP:n kanssa. Tulos: Kristillinen Keskusta 2, SDP 2, LibCon 1, Kristillinen Oikeisto 1.",
            "Koskikylä kääntyi vasemmalle. SDP:n vahva tuki maatalous- ja tehdastyöläisten keskuudessa toi sille vaalivoiton. Tulos: SDP 3, Kristillinen Keskusta 2.",
            "Puistokylä säilytti oikeistolaisen hallintonsa. LibCon ja Kristillinen Oikeisto muodostavat yhteishallituksen vakauden ja perinteisten arvojen pohjalla. Tulos: LibCon 2, Kristillinen Oikeisto 2, Kristillinen Keskusta 1.",
            "Kokonaiskuva: Pyhä Koalitio säilytti enemmistön viidessä seitsemästä osavaltiosta. Kokonaistulos vahvistaa oikeistohallituksen asemaa ja antaa sille selkeän jatkomandaatin. LibCon 12, Kristillinen Oikeisto 7, Kristillinen Keskusta 8, SDP 7, Vihreä Liitto 2.",
            "”Vakautta ja jatkuvuutta – se on hyvä uutinen koko Kirkkonummelle. Demokratia on toiminut, ja hallitus voi jatkaa kehittämistä turvallisissa oloissa,” kommentoi KNT:n yleiskomentaja äänestystuloksen vahvistamisen jälkeen.",
            "🕊 NUMMINEWS – seuraa osavaltiokohtaisia hallitusneuvotteluja ja Pyhän Koalition tulevaa linjaa ensi viikolla julkaistavassa analyysissä."
        ],
        images: [],
    };
    
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
            "KNT:n turvayksiköt ja Nuristanin jälleenrakennusministeriö valvovat työtä tiiviissä yhteistyössä. Suunnitelmien mukaan Niilikylä liitetään hallinnollisesti Nuristanin valtioon toisena kaupunginosana, ja sen odotetaan tarjovavan asuin- ja työpaikkoja jopa 30 000–40 000 asukkaalle valmistuessaan.",
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
            "Kaikki epäillyihin liittyvien henkilöiden kotitalouksia ja lähipiiriä kuulustellaan.",
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
            "Viimeinen varmistettu havainto Lehtosesta tehtiin noin klo 16.00 Vanhan kaupungin ja Uuden keskustan yhdistävällä sillalla, jossa valvontakameran kasvontunnistus vahvisti hänen henkilöllisyteensä. Kamera-aineiston mukaan hän liikkui sillan vasemmalla puolella, Uuden keskustan puoleisella nurmikkoalueella, josta johtaa metsäinen polku kohti valtuustotaloa.",
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
        imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAHSA8gDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1VldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA-MiI1IcbBUnz2/gq3K//wB2/gYIq2V/+7fwH8W//wDKl/gf9q3//AJUv8D/tVw/7S/wP+23D/wDS/wAB/Wrf/wDlS/wH/W3B/wBr/gP/AH9x/wDkf4D/AL/cR/8AI/wH/AH/xH/In+B/3+xP/AJA/wH/AZif8g/wD/gMxf/kD/wAA/wCBmL/yB/4H/gSi/wCQf+B/4EY/+Q/8D/gRj/8Ay/wH/gRj/wD/AAP/AAVj/8v/AID/AMFY/wD5f4D/AMFY/wD5fwP/AAbD/wB//gP/AAbf+j/A/wCDf+D/AAH/AIN/wf+B/wCDi/+CP/gf+DiX/gj/AMH/g4v/AOCf/wAD/g3j/wD4n/A/+DeP/wDk/gf+DeT/AJD/AMH/g1/8B/wAH/g1/wL+D/wAGP8H/gP8Agy/g/wDAf+DD+A/wH/hf/AOD/gH/DP/AOH/APA/8M/+H/gP+F/gf+Gf4H/h/wP/AAf8Ef8AD/wf+Af8H/gH/B/wD+D/g/8A//Z',
        author: "NummiNews Toimitus",
        publishedDate: "24.10.2024",
        fullContent: [
            "Tervetuloa NummiNewsin uudelle sivustolle! Olemme tehneet kovasti töitä tarjotaksemme teille paremman ja sujuvamman käyttökokemuksen. Uusi sivusto on suunniteltu moderniksi ja helppokäyttöiseksi kaikilla laitteilla.",
            "Toivomme, että nautitte uudesta ulkoasusta ja parannetuista ominaisuuksista. Palautteenne on meille tärkeää, joten kertokaa meille, mitä mieltä olette!",
            "Tämä on uuden aikakauden alku NummiNewsille, ja olemme innoissamme siitä, mitä tulevaisuus tuo tullessaan. Pysykää kuulolla!"
        ],
        images: [
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADvAQIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1VldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA-MiI1IcbBUnz2/gq3K//wB2/gYIq2V/+7fwH8W//wDKl/gf9q3//AJUv8D/tVw/7S/wP+23D/wDS/wAB/Wrf/wDlS/wH/W3B/wBr/gP/AH9x/wDkf4D/AL/cR/8AI/wH/AH/xH/In+B/3+xP/AJA/wH/AZif8g/wD/gMxf/kD/wAA/wCBmL/yB/4H/gSi/wCQf+B/4EY/+Q/8D/gRj/8Ay/wH/gRj/wD/AAP/AAVj/8v/AID/AMFY/wD5f4D/AMFY/wD5fwP/AAbD/wB//gP/AAbf+j/A/wCDf+D/AAH/AIN/wf+B/wCDi/+CP/gf+DiX/gj/AMH/g4v/AOCf/wAD/g3j/wD4n/A/+DeP/wDk/gf+DeT/AJD/AMH/g1/8B/wAH/g1/wL+D/wAGP8H/gP8Agy/g/wDAf+DD+A/wH/hf/AOD/gH/DP/AOH/APA/8M/+H/gP+F/gf+Gf4H/h/wP/AAf8Ef8AD/wf+Af8H/gH/B/wD+D/g/8A//Z',
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADvAQIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1VldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA-MiI1IcbBUnz2/gq3K//wB2/gYIq2V/+7fwH8W//wDKl/gf9q3//AJUv8D/tVw/7S/wP+23D/wDS/wAB/Wrf/wDlS/wH/W3B/wBr/gP/AH9x/wDkf4D/AL/cR/8AI/wH/AH/xH/In+B/3+xP/AJA/wH/AZif8g/wD/gMxf/kD/wAA/wCBmL/yB/4H/gSi/wCQf+B/4EY/+Q/8D/gRj/8Ay/wH/gRj/wD/AAP/AAVj/8v/AID/AMFY/wD5f4D/AMFY/wD5fwP/AAbD/wB//gP/AAbf+j/A/wCDf+D/AAH/AIN/wf+B/wCDi/+CP/gf+DiX/gj/AMH/g4v/AOCf/wAD/g3j/wD4n/A/+DeP/wDk/gf+DeT/AJD/AMH/g1/8B/wAH/g1/wL+D/wAGP8H/gP8Agy/g/wDAf+DD+A/wH/hf/AOD/gH/DP/AOH/APA/8M/+H/gP+F/gf+Gf4H/h/wP/AAf8Ef8AD/wf+Af8H/gH/B/wD+D/g/8A//Z',
            'https://i.postimg.cc/Vk1XhH10/image.png'
        ],
    };
    
    const importantNews: NewsArticle[] = [maroviaWarEscalatesArticle, maroviaCivilWarArticle, satelliteArticle, fusionReactorArticle, kntRevenueArticle, itaniemiReconstructionArticle, maroviaNetworkArticle, nuclearPlantArticle, koicuMurderArticle, electionArticle, maroviaNovaArticle, niilikylaReconstructionArticle, kntGreatBattleVictoryArticle, nuristanMuslimsReportArticle, kirkkonummiAidArticle, nuristanReconstructionArticle, investigationArticle, kntWarningArticle, lehtonenArticle, downtownLivingArticle, airPocketsArticle];
    const allNews: NewsArticle[] = [maroviaWarEscalatesArticle, maroviaCivilWarArticle, satelliteArticle, fusionReactorArticle, kntRevenueArticle, itaniemiReconstructionArticle, maroviaNetworkArticle, nuclearPlantArticle, koicuMurderArticle, electionArticle, maroviaNovaArticle, niilikylaReconstructionArticle, kntGreatBattleVictoryArticle, nuristanMuslimsReportArticle, kirkkonummiAidArticle, nuristanReconstructionArticle, investigationArticle, kntWarningArticle, lehtonenArticle, downtownLivingArticle, airPocketsArticle, metroArticle, kntVictoryArticle, nuristanArticle, welcomeArticle];

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
            <Ticker articles={importantNews} className={selectedArticle ? 'retracted' : ''} />
            <main className={`main-content ${selectedArticle ? 'ticker-hidden' : ''}`}>
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
