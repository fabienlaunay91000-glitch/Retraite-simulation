import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

const CONTACT_EMAIL = "hello@solutionstmf.com";

const ARTICLES = [
  { id: "1", slug: "comment-lire-son-releve-de-carriere", title: "Comment lire son releve de carriere ?", excerpt: "Apprenez a decrypter votre releve de carriere et comprendre chaque ligne de ce document essentiel.", content: "Le releve de carriere est un document fondamental pour preparer votre retraite. Il recapitule l'ensemble de vos droits acquis tout au long de votre vie professionnelle.\n\nLe releve de carriere, aussi appele releve individuel de situation (RIS), est un document recapitulatif qui retrace l'ensemble de votre parcours professionnel.\n\nVous pouvez obtenir votre releve de carriere sur le site info-retraite.fr avec votre numero de securite sociale, par courrier en ecrivant a votre caisse de retraite, ou automatiquement a partir de 35 ans.\n\nChaque annee, vous pouvez valider jusqu'a 4 trimestres. Pour une retraite a taux plein, vous devez generalement avoir entre 166 et 172 trimestres selon votre annee de naissance.\n\nSi vous constatez une erreur ou un oubli, rassemblez vos justificatifs, contactez votre caisse de retraite et faites une demande de regularisation.", read_time: 8, date: "2024-01-15", category: "Guide" },
  { id: "2", slug: "combien-vais-je-toucher-a-la-retraite", title: "Comment savoir combien je vais toucher a la retraite ?", excerpt: "Decouvrez les methodes pour estimer votre future pension de retraite.", content: "La question du montant de sa future retraite preoccupe de nombreux Francais.\n\nPour le regime general, on prend en compte vos 25 meilleures annees de revenus. Le nombre de trimestres valides determine si vous aurez droit a une retraite a taux plein (50%).\n\nFormule: Pension = Salaire annuel moyen x Taux x (Trimestres valides / Trimestres requis)\n\nUtilisez le simulateur M@rel sur info-retraite.fr pour une estimation personnalisée.", read_time: 7, date: "2024-01-10", category: "Calcul" },
  { id: "3", slug: "erreurs-frequentes-releves-carriere", title: "Les erreurs frequentes sur les releves de carriere", excerpt: "Identifiez les erreurs les plus courantes sur votre releve de carriere.", content: "Votre releve de carriere peut contenir des erreurs qui impacteront votre pension.\n\nLes erreurs courantes: periodes d'emploi manquantes, trimestres non valides (service militaire, conge maternite), salaires incorrects, erreurs d'etat civil.\n\nSelon nos analyses, 30% des releves contiennent au moins une anomalie. Les corrections peuvent rapporter jusqu'a 100 euros/mois supplementaires.", read_time: 9, date: "2024-01-08", category: "Erreurs" },
  { id: "4", slug: "que-faire-a-la-retraite-bons-plans", title: "Que faire a la retraite : les bons plans", excerpt: "Decouvrez comment profiter pleinement de votre retraite.", content: "La retraite est une nouvelle etape de vie riche en possibilites.\n\nVoyager malin avec les cartes de reduction SNCF Senior+. Profitez des activites culturelles avec la Carte Senior. Sport et bien-etre avec les associations sportives a tarifs preferentiels.", read_time: 6, date: "2024-01-05", category: "Lifestyle" },
  { id: "5", slug: "age-depart-retraite-france", title: "A quel age partir a la retraite en France ?", excerpt: "Tout savoir sur l'age legal de depart a la retraite.", content: "L'age legal augmente progressivement selon votre annee de naissance.\n\nNe avant 1961: 62 ans. Ne en 1964: 63 ans. Ne a partir de 1968: 64 ans.\n\nA 67 ans, vous beneficiez automatiquement du taux plein.", read_time: 8, date: "2024-01-03", category: "Reglementation" },
  { id: "6", slug: "ne-pas-etre-isole-retraite", title: "Ne pas etre isole a la retraite", excerpt: "Conseils pour maintenir une vie sociale active.", content: "L'isolement est un risque reel a la retraite. Impact sur la sante: depression, declin cognitif.\n\nMaintenir le lien social: planifiez des rencontres regulieres, utilisez la technologie, rejoignez des associations locales.", read_time: 7, date: "2024-01-01", category: "Bien-etre" },
  { id: "7", slug: "recuperer-trimestres-manquants", title: "Comment recuperer ses trimestres manquants ?", excerpt: "Solutions pour completer vos trimestres.", content: "Rachat de trimestres: annees d'etudes superieures (jusqu'a 12 trimestres), annees incompletes. Cout: 1000 euros a 6500 euros par trimestre, deductible des impots.\n\nRegularisation de carriere: service militaire, conge maternite, periodes de maladie.", read_time: 9, date: "2023-12-28", category: "Optimisation" },
  { id: "8", slug: "demarches-avant-retraite", title: "Retraite : les demarches a faire avant de partir", excerpt: "Checklist des demarches administratives.", content: "6 mois avant: verifiez votre releve sur info-retraite.fr, utilisez le simulateur M@rel.\n\n4 mois avant: faites votre demande de retraite en ligne sur lassuranceretraite.fr.", read_time: 8, date: "2023-12-25", category: "Demarches" },
  { id: "9", slug: "retraite-plus-faible-que-prevu", title: "Pourquoi votre retraite pourrait etre plus faible que prevu", excerpt: "Les facteurs qui peuvent reduire votre pension.", content: "Trimestres manquants: 1,25% de moins par trimestre manquant, jusqu'a 25% de decote maximale.\n\nLa pension brute est amputee de: CSG 8,3%, CRDS 0,5%, Casa 0,3%. Exemple: 1500 euros brut = environ 1350 euros net.", read_time: 8, date: "2023-12-20", category: "Alerte" },
  { id: "10", slug: "gestion-psychologique-retraite", title: "Gestion psychologique : stress, burn-out apres le travail", excerpt: "Comment gerer la transition psychologique vers la retraite.", content: "La transition vers la retraite est un bouleversement psychologique majeur.\n\nAvant le depart: preparez la transition mentalement, developpez des interets hors travail.\n\nLes premiers mois: maintenez une structure, evitez l'isolement, trouvez un nouveau sens.", read_time: 9, date: "2023-12-15", category: "Bien-etre" },
  { id: "11", slug: "simulateur-retraite-fiabilite", title: "Simulateur retraite : est-ce fiable ?", excerpt: "Analyse critique des simulateurs de retraite en ligne.", content: "Le simulateur M@rel sur info-retraite.fr est le plus fiable car base sur vos vraies donnees de carriere.\n\nLes simulateurs simplifies sont rapides mais peuvent etre tres imprecis. Prenez les resultats comme indicatifs.", read_time: 7, date: "2023-12-10", category: "Outils" },
  { id: "12", slug: "optimiser-retraite-sans-expert", title: "Comment optimiser sa retraite sans etre expert", excerpt: "Des conseils simples pour ameliorer votre future pension.", content: "30% des releves contiennent des erreurs pouvant impacter la pension.\n\nActions immediates: verifiez votre releve sur info-retraite.fr, conservez tous vos bulletins de salaire, signalez les erreurs rapidement.", read_time: 8, date: "2023-12-05", category: "Optimisation" },
  { id: "13", slug: "releve-carriere-incomplet", title: "Releve de carriere incomplet : que faire ?", excerpt: "Guide pour completer les periodes manquantes.", content: "Ce qui doit figurer: tous vos emplois, les periodes assimilees (chomage, maladie, maternite), le service militaire, les stages remuneres.\n\nProcedure: rassemblez les preuves (bulletins de salaire, contrats), faites la demande sur lassuranceretraite.fr.", read_time: 9, date: "2023-12-01", category: "Demarches" }
];

var simulateRetirement = function(age, yearsContributed, averageIncome) {
  var trimestresAcquired = yearsContributed * 4;
  var trimestresNeeded = 172;
  var trimestresMissing = Math.max(0, trimestresNeeded - trimestresAcquired);
  var decote = Math.min(trimestresMissing * 0.625, 25);
  var taux = 50 - decote;
  var pensionBase = averageIncome * (taux / 100) * (Math.min(trimestresAcquired, trimestresNeeded) / trimestresNeeded);
  var pensionAnnuelle = pensionBase + pensionBase * 0.67;
  var pensionMensuelle = pensionAnnuelle / 12;
  var message = trimestresMissing > 0
    ? "Attention : il vous manque environ " + trimestresMissing + " trimestres pour le taux plein."
    : "Vous semblez avoir suffisamment de trimestres pour une retraite a taux plein !";
  return { estimatedMonthly: Math.round(pensionMensuelle), estimatedYearly: Math.round(pensionAnnuelle), trimestresAcquired: trimestresAcquired, trimestresNeeded: trimestresNeeded, message: message };
};

var Icon = function(props) {
  var name = props.name;
  var className = props.className || "w-6 h-6";
  var icons = {
    file: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    check: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    alert: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    users: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    arrow: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>,
    mail: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    menu: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
    x: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
    star: <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
    clock: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    shield: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    target: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    eye: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    lightbulb: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    calculator: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    brain: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    home: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    search: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    help: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    send: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  };
  return icons[name] || null;
};

var Header = function() {
  var menuState = useState(false);
  var isMenuOpen = menuState[0];
  var setIsMenuOpen = menuState[1];
  var scrollState = useState(false);
  var isScrolled = scrollState[0];
  var setIsScrolled = scrollState[1];

  useEffect(function() {
    var handleScroll = function() { setIsScrolled(window.scrollY > 50); };
    window.addEventListener("scroll", handleScroll);
    return function() { window.removeEventListener("scroll", handleScroll); };
  }, []);

  return (
    <header className={isScrolled ? "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#F9F9F7]/95 backdrop-blur-xl shadow-sm" : "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#2C5234] flex items-center justify-center">
              <Icon name="file" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1C1C1A]">Retraite Simplifiée</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/#probleme" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Problème</a>
            <a href="/#solution" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Solution</a>
            <a href="/#simulateur" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Simulateur</a>
            <Link to="/blog" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Blog</Link>
            <a href="/#contact" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Contact</a>
          </nav>
          <a href="/#contact" className="hidden md:block">
            <button className="bg-[#2C5234] hover:bg-[#1F3A24] text-white px-6 py-3 rounded-full font-medium transition-colors">
              Nous contacter
            </button>
          </a>
          <button className="md:hidden p-2" onClick={function() { setIsMenuOpen(!isMenuOpen); }}>
            <Icon name={isMenuOpen ? "x" : "menu"} className="w-6 h-6" />
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-lg p-6 mt-2">
            <nav className="flex flex-col gap-4">
              <a href="/#probleme" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={function() { setIsMenuOpen(false); }}>Problème</a>
              <a href="/#solution" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={function() { setIsMenuOpen(false); }}>Solution</a>
              <a href="/#simulateur" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={function() { setIsMenuOpen(false); }}>Simulateur</a>
              <Link to="/blog" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={function() { setIsMenuOpen(false); }}>Blog</Link>
              <a href="/#contact" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={function() { setIsMenuOpen(false); }}>Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

var HeroSection = function() {
  return (
    <section className="pt-32 pb-20 px-4 bg-[#F9F9F7]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Icon name="users" className="w-4 h-4" />
              Plus de 15 000 personnes accompagnées
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C1C1A] leading-tight mb-6">
              Comprenez enfin votre retraite en <span className="text-[#2C5234]">quelques minutes</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#5B5B56] mb-8 leading-relaxed">
              Recevez une analyse claire et simplifiee de votre situation a partir de vos documents officiels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#simulateur">
                <button className="w-full sm:w-auto bg-[#2C5234] hover:bg-[#1F3A24] text-white px-8 py-4 rounded-full text-lg font-medium transition-colors flex items-center justify-center gap-2">
                  Simuler ma retraite gratuitement
                  <Icon name="calculator" className="w-5 h-5" />
                </button>
              </a>
              <a href="#contact">
                <button className="w-full sm:w-auto border-2 border-[#2C5234] text-[#2C5234] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#EFECE6] transition-colors flex items-center justify-center gap-2">
                  <Icon name="mail" className="w-5 h-5" />
                  Nous contacter
                </button>
              </a>
            </div>
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-[#E0DCD1]">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(function(i) {
                  return (
                    <div key={i} className="w-10 h-10 rounded-full bg-[#EFECE6] border-2 border-white flex items-center justify-center">
                      <Icon name="users" className="w-4 h-4 text-[#2C5234]" />
                    </div>
                  );
                })}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(function(i) {
                    return <Icon key={i} name="star" className="w-4 h-4 text-[#C98263]" />;
                  })}
                </div>
                <p className="text-sm text-[#5B5B56]">4.9/5 basé sur 2 500 avis</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1599947146406-612486387faf?w=800" alt="Documents retraite" className="rounded-2xl shadow-2xl w-full object-cover" />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#2C5234] flex items-center justify-center">
                  <Icon name="shield" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[#1C1C1A]">100% Sécurisé</p>
                  <p className="text-sm text-[#5B5B56]">Conforme RGPD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

var ProblemSection = function() {
  var problems = [
    { icon: "search", title: "Informations complexes", desc: "Des documents difficiles à comprendre" },
    { icon: "help", title: "Estimation difficile", desc: "Impossible de calculer ses droits" },
    { icon: "alert", title: "Peur des erreurs", desc: "Risque de se tromper" },
    { icon: "eye", title: "Manque de visibilité", desc: "Impossible de vérifier" }
  ];

  return (
    <section id="probleme" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#B0413E]/10 text-[#B0413E] px-4 py-2 rounded-full text-sm font-semibold mb-4">Le Problème</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">Comprendre sa retraite est un vrai casse-tête</h2>
          <p className="text-lg text-[#5B5B56] max-w-2xl mx-auto">Résultat : vous avancez dans le flou.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map(function(p, i) {
            return (
              <div key={i} className="bg-[#F9F9F7] border border-[#E0DCD1] rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-[#B0413E]/10 flex items-center justify-center mb-4">
                  <Icon name={p.icon} className="w-7 h-7 text-[#B0413E]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1C1C1A] mb-2">{p.title}</h3>
                <p className="text-[#5B5B56]">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

var SolutionSection = function() {
  var solutions = [
    { icon: "target", title: "Comprendre votre situation", desc: "Analyse claire de vos droits acquis" },
    { icon: "alert", title: "Identifier les erreurs", desc: "Repérage des oublis et anomalies" },
    { icon: "eye", title: "Points d'attention", desc: "Ce qui mérite votre vigilance" },
    { icon: "lightbulb", title: "Actions à entreprendre", desc: "Recommandations personnalisées" }
  ];

  return (
    <section id="solution" className="py-24 px-4 bg-[#F9F9F7]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-[#2C5234]/10 text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">Notre Solution</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-6">Une analyse claire pour reprendre le contrôle</h2>
            <div className="space-y-4">
              {solutions.map(function(s, i) {
                return (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[#E0DCD1]">
                    <div className="w-12 h-12 rounded-xl bg-[#2C5234]/10 flex items-center justify-center shrink-0">
                      <Icon name={s.icon} className="w-6 h-6 text-[#2C5234]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1C1C1A] mb-1">{s.title}</h3>
                      <p className="text-[#5B5B56]">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800" alt="Solution retraite" className="rounded-2xl shadow-xl w-full object-cover" />
        </div>
      </div>
    </section>
  );
};

var HowItWorksSection = function() {
  var steps = [
    { n: "1", title: "Importez vos documents", desc: "Envoyez votre relevé de façon sécurisée", icon: "file" },
    { n: "2", title: "Notre système analyse", icon: "brain" },
    { n: "3", title: "Recevez votre synthèse", desc: "Synthèse claire et compréhensible", icon: "check" }
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">Comment ça marche</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">3 étapes simples</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(function(s, i) {
            return (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#2C5234] text-white flex items-center justify-center mx-auto mb-6 text-2xl font-bold">{s.n}</div>
                <div className="w-14 h-14 rounded-xl bg-[#EFECE6] flex items-center justify-center mx-auto mb-4">
                  <Icon name={s.icon} className="w-7 h-7 text-[#2C5234]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1C1C1A] mb-2">{s.title}</h3>
                <p className="text-[#5B5B56]">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

var WhatYouReceiveSection = function() {
  var items = ["Résumé de votre situation", "Points de vigilance identifiés", "Estimation indicative", "Recommandations générales"];

  return (
    <section className="py-24 px-4 bg-[#2C5234]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">Ce que vous recevez</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-6">Une synthèse complète</h2>
            <div className="space-y-4">
              {items.map(function(item, i) {
                return (
                  <div key={i} className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                    <Icon name="check" className="w-6 h-6 text-[#C98263]" />
                    <span className="text-white text-lg">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white/10 rounded-2xl p-8">
            <div className="space-y-6">
              {[
                {icon: "file", title: "Rapport personnalisé", desc: "Adapté à votre situation"},
                {icon: "clock", title: "Livraison rapide", desc: "Sous 48h ouvrées"},
                {icon: "shield", title: "Confidentialité", desc: "Données protégées RGPD"}
              ].map(function(item, i) {
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#C98263] flex items-center justify-center">
                      <Icon name={item.icon} className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{item.title}</h4>
                      <p className="text-white/70">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

var SimulatorSection = function() {
  var ageState = useState(45);
  var age = ageState[0];
  var setAge = ageState[1];
  var yearsState = useState(20);
  var years = yearsState[0];
  var setYears = yearsState[1];
  var incomeState = useState(35000);
  var income = incomeState[0];
  var setIncome = incomeState[1];
  var resultState = useState(null);
  var result = resultState[0];
  var setResult = resultState[1];

  var handleSimulate = function() {
    setResult(simulateRetirement(age, years, income));
  };

  return (
    <section id="simulateur" className="py-24 px-4 bg-[#F9F9F7]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#C98263]/10 text-[#C98263] px-4 py-2 rounded-full text-sm font-semibold mb-4">Outil gratuit</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">Simulateur de retraite</h2>
        </div>
        <div className="bg-white border border-[#E0DCD1] rounded-2xl shadow-lg p-8">
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-[#1C1C1A] font-medium">Votre âge actuel</label>
                <span className="text-[#2C5234] font-bold text-lg">{age} ans</span>
              </div>
              <input type="range" value={age} onChange={function(e) { setAge(Number(e.target.value)); }} min={25} max={67} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-[#1C1C1A] font-medium">Annees de cotisation</label>
                <span className="text-[#2C5234] font-bold text-lg">{years} ans</span>
              </div>
              <input type="range" value={years} onChange={function(e) { setYears(Number(e.target.value)); }} min={0} max={45} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-[#1C1C1A] font-medium">Revenu moyen annuel</label>
                <span className="text-[#2C5234] font-bold text-lg">{income.toLocaleString('fr-FR')} euros</span>
              </div>
              <input type="range" value={income} onChange={function(e) { setIncome(Number(e.target.value)); }} min={15000} max={100000} step={1000} className="w-full" />
            </div>
            <button onClick={handleSimulate} className="w-full bg-[#2C5234] hover:bg-[#1F3A24] text-white py-4 rounded-full text-lg font-medium transition-colors flex items-center justify-center gap-2">
              Simuler ma retraite
              <Icon name="calculator" className="w-5 h-5" />
            </button>
            {result && (
              <div className="mt-8 p-6 bg-[#EFECE6] rounded-2xl">
                <h3 className="text-xl font-semibold text-[#1C1C1A] mb-4">Résultat</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-[#5B5B56] text-sm">Estimation mensuelle</p>
                    <p className="text-2xl font-bold text-[#2C5234]">{result.estimatedMonthly.toLocaleString('fr-FR')} euros</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-[#5B5B56] text-sm">Trimestres acquis / requis</p>
                    <p className="text-2xl font-bold text-[#1C1C1A]">{result.trimestresAcquired} / {result.trimestresNeeded}</p>
                  </div>
                </div>
                <div className="bg-[#C98263]/10 rounded-xl p-4">
                  <p className="text-[#1C1C1A]">{result.message}</p>
                </div>
                <p className="text-sm text-[#5B5B56] mt-4 text-center">Estimation indicative uniquement.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

var TestimonialsSection = function() {
  var testimonials = [
    { name: "Marie D.", role: "Enseignante, 58 ans", content: "J'ai découvert 3 années de cotisation manquantes !" },
    { name: "Pierre L.", role: "Cadre, 62 ans", content: "Le rapport était clair et précis." },
    { name: "Jean-Claude M.", role: "Artisan, 60 ans", content: "Service exceptionnel et tres humain." }
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">Témoignages</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">Ils nous font confiance</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(function(t, i) {
            return (
              <div key={i} className="bg-[#F9F9F7] border border-[#E0DCD1] rounded-2xl p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(function(s) { return <Icon key={s} name="star" className="w-5 h-5 text-[#C98263]" />; })}
                </div>
                <p className="text-[#5B5B56] mb-6">"{t.content}"</p>
                <div>
                  <p className="font-semibold text-[#1C1C1A]">{t.name}</p>
                  <p className="text-sm text-[#5B5B56]">{t.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

var ContactSection = function() {
  var formState = useState({ name: "", email: "", message: "" });
  var form = formState[0];
  var setForm = formState[1];

  var handleSubmit = function(e) {
    e.preventDefault();
    var subject = encodeURIComponent("Contact - " + form.name);
    var body = encodeURIComponent("Nom: " + form.name + "\nEmail: " + form.email + "\n\nMessage:\n" + form.message);
    window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
  };

  return (
    <section id="contact" className="py-24 px-4 bg-[#F9F9F7]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="inline-block bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">Contact</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-6">Une question ?</h2>
            <p className="text-lg text-[#5B5B56] mb-8">Notre équipe est à votre disposition pour répondre à toutes vos questions sur votre retraite.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#EFECE6] flex items-center justify-center">
                  <Icon name="clock" className="w-6 h-6 text-[#2C5234]" />
                </div>
                <div>
                  <p className="font-medium text-[#1C1C1A]">Réponse rapide</p>
                  <p className="text-sm text-[#5B5B56]">Sous 24h ouvrées</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#EFECE6] flex items-center justify-center">
                  <Icon name="shield" className="w-6 h-6 text-[#2C5234]" />
                </div>
                <div>
                  <p className="font-medium text-[#1C1C1A]">Confidentiel</p>
                  <p className="text-sm text-[#5B5B56]">Vos données sont protégées</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-[#E0DCD1] rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#1C1C1A] font-medium mb-2">Nom</label>
                <input type="text" value={form.name} onChange={function(e) { setForm({name: e.target.value, email: form.email, message: form.message}); }} required className="w-full border border-[#E0DCD1] rounded-xl py-3 px-4 bg-white" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-[#1C1C1A] font-medium mb-2">Email</label>
                <input type="email" value={form.email} onChange={function(e) { setForm({name: form.name, email: e.target.value, message: form.message}); }} required className="w-full border border-[#E0DCD1] rounded-xl py-3 px-4 bg-white" placeholder="votre@email.com" />
              </div>
              <div>
                <label className="block text-[#1C1C1A] font-medium mb-2">Message</label>
                <textarea value={form.message} onChange={function(e) { setForm({name: form.name, email: form.email, message: e.target.value}); }} required rows={4} className="w-full border border-[#E0DCD1] rounded-xl py-3 px-4 bg-white" placeholder="Votre message..." />
              </div>
              <button type="submit" className="w-full bg-[#2C5234] hover:bg-[#1F3A24] text-white py-4 rounded-full font-medium transition-colors flex items-center justify-center gap-2">
                Envoyer le message
                <Icon name="send" className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

var DisclaimerSection = function() {
  return (
    <section className="py-12 px-4 bg-[#EFECE6]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#E0DCD1]">
          <Icon name="alert" className="w-8 h-8 text-[#C98263] shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-[#1C1C1A] mb-2">Avertissement important</h3>
            <p className="text-[#5B5B56] text-sm">Ce service fournit une analyse informative. Il ne constitue pas un conseil financier ou juridique. Consultez les organismes officiels pour toute décision.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

var BlogPreviewSection = function() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">Ressources</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">Nos articles</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {ARTICLES.slice(0, 3).map(function(a) {
            return (
              <Link key={a.id} to={"/article/" + a.slug} className="bg-[#F9F9F7] border border-[#E0DCD1] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-[#2C5234]/10 to-[#C98263]/10 flex items-center justify-center">
                  <Icon name="file" className="w-16 h-16 text-[#2C5234]/50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-[#EFECE6] text-[#2C5234] text-xs px-2 py-1 rounded">{a.category}</span>
                    <span className="text-xs text-[#5B5B56] flex items-center gap-1"><Icon name="clock" className="w-3 h-3" /> {a.read_time} min</span>
                  </div>
                  <h3 className="font-semibold text-[#1C1C1A] mb-2">{a.title}</h3>
                  <p className="text-sm text-[#5B5B56] line-clamp-2">{a.excerpt}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="text-center">
          <Link to="/blog">
            <button className="border-2 border-[#2C5234] text-[#2C5234] px-8 py-4 rounded-full font-medium hover:bg-[#EFECE6] transition-colors">
              Voir tous les articles
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

var Footer = function() {
  return (
    <footer className="bg-[#1C1C1A] text-[#F9F9F7] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#2C5234] flex items-center justify-center">
                <Icon name="file" className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Retraite Simplifiée</span>
            </div>
            <p className="text-[#F9F9F7]/70 mb-6">Votre partenaire pour comprendre votre retraite. Plus de 15 000 personnes accompagnées.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-[#F9F9F7]/70">
              <li><a href="/#probleme" className="hover:text-white">Problème</a></li>
              <li><a href="/#solution" className="hover:text-white">Solution</a></li>
              <li><a href="/#simulateur" className="hover:text-white">Simulateur</a></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><a href="/#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Informations</h4>
            <ul className="space-y-2 text-[#F9F9F7]/70">
              <li>Simulateur gratuit disponible</li>
              <li>13 articles et guides</li>
              <li>Conforme RGPD</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#F9F9F7]/10 pt-8 text-center text-[#F9F9F7]/50 text-sm">
          <p>© {new Date().getFullYear()} Retraite Simplifiée. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

var HomePage = function() {
  return (
    <div>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <WhatYouReceiveSection />
      <SimulatorSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <ContactSection />
      <DisclaimerSection />
    </div>
  );
};

var BlogPage = function() {
  return (
    <div className="pt-24 pb-20 px-4 bg-[#F9F9F7] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1A] mb-4">Nos articles</h1>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map(function(a) {
            return (
              <Link key={a.id} to={"/article/" + a.slug} className="bg-white border border-[#E0DCD1] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-[#2C5234]/10 to-[#C98263]/10 flex items-center justify-center">
                  <Icon name="file" className="w-16 h-16 text-[#2C5234]/50" />
                </div>
                <div className="p-6">
                  <span className="bg-[#EFECE6] text-[#2C5234] text-xs px-2 py-1 rounded">{a.category}</span>
                  <h3 className="font-semibold text-[#1C1C1A] mt-3 mb-2">{a.title}</h3>
                  <p className="text-sm text-[#5B5B56]">{a.excerpt}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

var ArticlePage = function() {
  var params = useParams();
  var slug = params.slug;
  var navigate = useNavigate();
  var article = ARTICLES.find(function(a) { return a.slug === slug; });

  useEffect(function() {
    if (!article) { navigate("/blog"); }
  }, [article, navigate]);

  if (!article) { return null; }

  return (
    <div className="pt-24 pb-20 px-4 bg-[#F9F9F7] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#2C5234] font-medium mb-8 hover:underline">
          <Icon name="home" className="w-4 h-4" /> Retour aux articles
        </Link>
        <article className="bg-white rounded-2xl border border-[#E0DCD1] p-8 sm:p-12">
          <span className="bg-[#EFECE6] text-[#2C5234] text-xs px-2 py-1 rounded">{article.category}</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1C1A] mt-4 mb-6">{article.title}</h1>
          <div className="text-[#5B5B56] leading-relaxed" style={{whiteSpace: 'pre-line'}}>{article.content}</div>
        </article>
        <div className="mt-12 p-8 bg-[#2C5234] rounded-2xl text-center">
          <h3 className="text-xl font-semibold text-white mb-4">Estimez votre retraite gratuitement</h3>
          <a href="/#simulateur">
            <button className="bg-white text-[#2C5234] px-8 py-4 rounded-full font-medium hover:bg-[#EFECE6]">Accéder au simulateur</button>
          </a>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-[#F9F9F7]">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
