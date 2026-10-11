// A reading guide for the existing Atles. IDs and source content stay unchanged.
// Principal = Villier editorial selection for a first discussion, not a CTTI ranking.
// Support identifies a useful contribution, not an unverified mandatory prerequisite.
window.ATLES_EDITORIAL = (() => {
  const relation = (id, kind, reason) => ({
    id, kind,
    label: kind === 'support' ? 'Amb el suport de' : 'Es complementa amb',
    reason
  });
  const s = (id, reason) => relation(id, 'support', reason);
  const c = (id, reason) => relation(id, 'complement', reason);
  const principal = ['A1','A2','A5','A6','B1','B3','B7','C5','C6','D1','E1','E2','F3','G2'];
  return {
    principal,
    criteria: [
      'Utilitat clara per als serveis i els equips del CTTI.',
      'Una base tècnica contrastable i un primer pas acotat.',
      'Un resultat que es pugui comprovar amb una prova concreta.',
      'Encaix amb les eines, els criteris i els responsables existents.',
      'Equilibri entre millores operatives i innovació que es pugui assajar.'
    ],
    groups: {
      A: { name: 'Dades fiables', benefit: 'Recollir dades que els equips puguin entendre, relacionar i reutilitzar.' },
      B: { name: 'Operació coordinada', benefit: 'Saber què observem, qui actua i com avancem en cada incident.' },
      C: { name: 'Intel·ligència aplicada', benefit: 'Aprofitar les dades i la IA per orientar el diagnòstic i l’acció.' },
      D: { name: 'Equips amb autonomia', benefit: 'Facilitar les tasques habituals i compartir allò que funciona.' },
      E: { name: 'Valor del servei', benefit: 'Relacionar fiabilitat, resultat i cost per decidir les millores.' },
      F: { name: 'Control i confiança', benefit: 'Decidir com s’utilitzen les dades i conservar la capacitat de canviar d’eina.' },
      G: { name: 'Experiència i protecció', benefit: 'Entendre com es viu el servei i comunicar-ne l’estat amb context.' }
    },
    cards: {
      A1: {
        title: 'Acordar les dades de cada servei',
        summary: 'Un esquema comú defineix noms, unitats i responsables; unes proves comproven que cada font el compleix.',
        benefit: 'Fer que les dades de diferents proveïdors es puguin relacionar amb confiança.',
        whyPrincipal: 'Concreta els criteris del Llibre Blanc en mostres i comprovacions repetibles.',
        relations: [s('A6','El catàleg comú aporta els noms i les correspondències que l’esquema ha de respectar.')]
      },
      A2: {
        title: 'Seguir les dades de la font al destí',
        summary: 'Collectors i passarel·les mostren què es recull, per on passa i què arriba a cada eina.',
        benefit: 'Conèixer la qualitat de cada tram i facilitar l’evolució de les eines.',
        whyPrincipal: 'Permet provar connectors i recuperació amb dues fonts i dos destins, sobre una base concreta.',
        relations: [s('A1','L’esquema acordat permet comprovar els senyals que entren.'),s('F3','Les polítiques d’accés i les rutes autoritzades orienten el tractament de les dades.'),s('A4','La configuració versionada facilita provar un canvi i recuperar la versió anterior.'),c('B3','Les proves de qualitat contrasten si la recollida i els avisos funcionen com s’espera.')]
      },
      A3: {
        title: 'Conservar les dades que necessitem',
        summary: 'Cada tipus de dada té un ús, un termini i una prova de recuperació associats.',
        benefit: 'Ajustar emmagatzematge i detall a les consultes i evidències que cal mantenir.',
        relations: [s('A1','El significat i l’ús dels senyals ajuden a definir què convé conservar.'),c('E3','El cost per servei permet comparar les opcions de retenció amb el seu valor operatiu.')]
      },
      A4: {
        title: 'Relacionar els canvis amb el resultat',
        summary: 'Regles, quadres i collectors es versionen, i cada desplegament aporta context a l’observabilitat.',
        benefit: 'Comparar el servei abans i després d’un canvi amb proves i versions identificades.',
        relations: [s('A1','Els identificadors comuns relacionen configuració, desplegament i servei.'),c('E2','Els objectius de servei aporten criteris per valorar el resultat d’un canvi.')]
      },
      A5: {
        title: 'Preparar cada servei per ser observat',
        summary: 'L’alta incorpora senyals, responsables i una prova real; eBPF amplia el detall en sistemes Linux compatibles.',
        benefit: 'Arribar a l’operació amb una cobertura coneguda i vies de diagnòstic preparades.',
        whyPrincipal: 'Aprofita els paquets CTTI i les proves MAT; permet assajar eBPF o perfilatge on la plataforma ho admeti.',
        relations: [s('A1','L’esquema defineix quins senyals i identificadors ha de generar l’alta.'),s('A2','El recorregut de recollida permet comprovar que els senyals arriben al destí.'),s('A4','Les plantilles versionades fan repetible la preparació del servei.'),s('B7','La ruta d’avís associa la nova cobertura a un equip que la pot atendre.')]
      },
      A6: {
        title: 'Connectar les dades d’un mateix servei',
        summary: 'Un catàleg relaciona noms, mètriques i components entre eines, amb origen i data de cada relació.',
        benefit: 'Consultar un servei amb el mateix significat encara que les dades visquin en llocs diferents.',
        whyPrincipal: 'Uneix inventari, desplegaments i activitat observada, una base útil per a moltes de les propostes.',
        relations: [c('A1','L’esquema de telemetria i el catàleg comparteixen definicions i es revisen conjuntament.'),s('F3','Els permisos determinen quines fonts i quin detall pot consultar cada equip.')]
      },
      B1: {
        title: 'Saber on podem millorar l’observabilitat',
        summary: 'Una valoració amb proves situa la cobertura i la maduresa de cada servei i orienta el següent pas.',
        benefit: 'Prioritzar millores a partir d’una situació inicial compartida i comprovable.',
        whyPrincipal: 'Ofereix un punt de partida per a la conversa amb el CTTI, amb criteris i evidències visibles.',
        relations: [s('A1','Les definicions acordades permeten comprovar si els senyals compleixen el criteri aplicable.'),s('A6','El catàleg situa les proves dins del servei i de les fonts que s’avaluen.')]
      },
      B2: {
        title: 'Convertir les millores en accions',
        summary: 'Cada punt a completar es transforma en una tasca amb responsable, revisió i prova de resultat.',
        benefit: 'Veure com avança la cobertura i reconèixer les millores que ja s’han comprovat.',
        relations: [s('B1','La valoració aporta els punts de millora i les proves que els justifiquen.'),c('A5','Les proves d’alta identifiquen cobertura a completar i en comproven l’evolució.')]
      },
      B3: {
        title: 'Comprovar que l’observabilitat funciona',
        summary: 'Senyals de prova i comprovacions de frescor recorren la cadena de recollida, consulta i avís.',
        benefit: 'Saber amb quines dades podem valorar la salut del servei en cada moment.',
        whyPrincipal: 'Té una comprovació directa: enviar, retardar i recuperar dades per verificar tota la cadena.',
        relations: [s('A1','La freqüència i el format acordats permeten reconèixer si una dada és vàlida i recent.'),s('A2','El seguiment de cada tram ajuda a localitzar on cal recuperar la visibilitat.'),s('B7','Una prova completa comprova també qui rep i accepta l’avís.')]
      },
      B4: {
        title: 'Compartir indicadors amb el mateix significat',
        summary: 'Operació, seguiment i direcció consulten vistes adaptades que parteixen de les mateixes definicions.',
        benefit: 'Poder explicar una xifra i reproduir l’informe on es va presentar.',
        relations: [s('A6','El catàleg aporta definicions i correspondències comunes entre fonts.'),s('B3','Les comprovacions de qualitat indiquen la vigència i la cobertura de les dades publicades.')]
      },
      B5: {
        title: 'Aprendre de cada incident',
        summary: 'Una cronologia compartida reuneix els fets i converteix les accions de millora en proves reutilitzables.',
        benefit: 'Fer que l’experiència d’un incident millori la resposta dels següents.',
        relations: [s('B8','El registre de coordinació aporta els traspassos, les decisions i els temps de l’incident.'),s('A6','Els identificadors comuns ajuden a reunir les evidències del mateix cas.'),c('D2','Les deteccions revisades es poden compartir amb les proves que acrediten la millora.')]
      },
      B6: {
        title: 'Coordinar els proveïdors amb el mateix context',
        summary: 'Les eines intercanvien l’estat del cas, l’impacte i les evidències que necessita cada equip.',
        benefit: 'Agilitzar el treball conjunt quan un incident travessa diversos serveis o contractes.',
        relations: [s('A1','Un format d’intercanvi compartit facilita interpretar els senyals entre proveïdors.'),s('A6','Les correspondències permeten reconèixer el mateix servei en eines diferents.'),c('B8','La coordinació de l’incident manté una visió conjunta mentre els equips intervenen.')]
      },
      B7: {
        title: 'Fer arribar cada alerta a l’equip adequat',
        summary: 'Un directori relaciona servei, guàrdia i canal, i confirma que l’avís té resposta.',
        benefit: 'Mantenir la continuïtat de l’atenció en canvis de torn i traspassos.',
        whyPrincipal: 'Connecta directament amb la matriu d’escalats i es pot provar amb serveis i guàrdies concrets.',
        relations: [s('A1','La identitat del servei permet trobar el responsable i la ruta d’avís corresponents.'),c('B2','Les rutes que cal completar passen a una acció amb responsable i prova de correcció.')]
      },
      B8: {
        title: 'Compartir el fil de cada incident',
        summary: 'Estats, rols i traspassos mantenen el context mentre els equips treballen en la recuperació.',
        benefit: 'Saber qui està actuant, quin és el següent pas i com es comprova la recuperació.',
        relations: [s('B7','Les rutes d’avís ajuden a activar els equips i a confirmar l’acceptació.'),s('A6','Les relacions entre serveis i components donen context al cas compartit.')]
      },
      C1: {
        title: 'Ampliar l’autonomia amb proves',
        summary: 'Els agents passen d’observar a proposar i actuar a mesura que superen comprovacions acordades.',
        benefit: 'Ajustar l’automatització al resultat demostrat i als permisos de cada funció.',
        relations: [s('C4','Les traces, les avaluacions i els permisos aporten proves per decidir l’abast autoritzat.')]
      },
      C2: {
        title: 'Combinar agents segons la tasca',
        summary: 'Cada funció té entrades, sortides i proves definides, perquè les alternatives es puguin comparar.',
        benefit: 'Evolucionar una part del flux mantenint les integracions i el context del cas.',
        relations: [s('C1','L’abast autoritzat concreta què pot proposar o executar cada funció.'),c('C3','La cerca de coneixement pot aportar procediments i antecedents al flux.'),s('C4','El registre d’execució permet contrastar resultat, permisos i consum de cada agent.')]
      },
      C3: {
        title: 'Trobar el coneixement operatiu que ajuda',
        summary: 'Una cerca amb permisos recupera procediments vigents i mostra les fonts de cada resposta.',
        benefit: 'Arribar abans a la informació aplicable al servei i al cas que s’està atenent.',
        relations: [s('C4','L’avaluació de respostes i les traces permeten comprovar fidelitat, permisos i ús de les fonts.')]
      },
      C4: {
        title: 'Comprovar la qualitat de la IA',
        summary: 'Cada execució relaciona fonts, eines, versions, aprovacions i cost amb el resultat obtingut.',
        benefit: 'Decidir quines funcions d’IA aporten valor i en quines condicions convé utilitzar-les.',
        relations: []
      },
      C5: {
        title: 'Donar prioritat als senyals útils',
        summary: 'Revisar alertes i dades amb els equips, i activar més detall durant una finestra de diagnòstic acotada.',
        benefit: 'Concentrar l’atenció i el consum en la informació que ajuda a decidir.',
        whyPrincipal: 'Parteix d’alertes i incidents coneguts; combina una millora operativa directa amb proves de diagnòstic sota demanda.',
        relations: [c('C1','Si el canvi l’executa un agent, els nivells d’autonomia en delimiten l’actuació.'),s('A6','El catàleg permet identificar propietaris, usos i consultes relacionades amb cada senyal.'),s('A2','La recollida aplica els canvis de mostreig i en mostra l’efecte sobre volum i entrega.'),c('A5','La instrumentació preparada facilita ampliar el detall en plataformes compatibles.'),s('F3','Els permisos i el filtratge de camps acompanyen cada finestra de diagnòstic.')]
      },
      C6: {
        title: 'Agilitzar el diagnòstic amb IA i evidències',
        summary: 'Un assistent reuneix context i proposa comprovacions que els operadors poden contrastar amb les fonts.',
        benefit: 'Avaluar si la IA ajuda a orientar la investigació amb més rapidesa i precisió.',
        whyPrincipal: 'El pilot pot partir del MVP i dels casos disponibles al CTTI, comparar resultats i concretar la millora incremental.',
        relations: [s('A6','El catàleg i el graf aporten identificadors i relacions amb origen i vigència.'),s('C1','L’abast acordat manté l’assistent dins de les consultes i actuacions autoritzades.'),c('C3','Els procediments i els incidents resolts completen el context que aporten els senyals.'),s('C4','Les traces i el banc de proves permeten comparar qualitat, cost i comportament entre versions.')]
      },
      C7: {
        title: 'Crear vistes a partir d’una pregunta',
        summary: 'Un assistent prepara consultes i gràfics sobre mètriques definides, amb revisió de fórmules i resultats.',
        benefit: 'Explorar el servei amb preguntes concretes i convertir les vistes útils en plantilles.',
        relations: [s('B3','Les comprovacions de qualitat situen la cobertura de les dades utilitzades.'),s('A6','La capa semàntica aporta mètriques, unitats i dimensions que es poden combinar.'),s('C4','L’avaluació contrasta la pregunta, la consulta, el gràfic i l’explicació generada.')]
      },
      D1: {
        title: 'Resoldre les peticions habituals amb autoservei',
        summary: 'Un catàleg curt guia altes i canvis, aplica permisos i comprova el resultat de cada petició.',
        benefit: 'Agilitzar les tasques repetibles i donar visibilitat del seu estat als equips.',
        whyPrincipal: 'Pot començar amb una font i un quadre inicial, comparant temps, intervencions i resultat.',
        relations: [s('A4','Les configuracions versionades fan repetibles els passos del catàleg.'),c('A5','Les plantilles d’alta aporten senyals i proves preparades per al nou servei.'),s('B7','Cada alta o regla queda vinculada a un equip i una ruta d’atenció.')]
      },
      D2: {
        title: 'Reutilitzar deteccions entre equips',
        summary: 'Regles, exemples i proves viatgen junts en paquets revisats i versionats.',
        benefit: 'Aprofitar una detecció útil en altres serveis compatibles i comprovar-ne el resultat.',
        relations: [s('A1','Les definicions de senyals permeten valorar si una regla encaixa en un altre servei.'),s('A4','La gestió de versions facilita desplegar, revisar i recuperar cada paquet.'),c('B5','L’aprenentatge d’incidents aporta exemples i proves per millorar les deteccions compartides.')]
      },
      D3: {
        title: 'Aprendre amb casos reals de treball',
        summary: 'Pràctiques breus per rol permeten seguir una traça, preparar una alerta o donar d’alta un servei.',
        benefit: 'Convertir la formació en capacitat que els equips puguin aplicar i compartir.',
        relations: [c('D1','Les operacions d’autoservei ofereixen tasques concretes per practicar.'),c('D2','Els paquets compartits aporten exemples i recullen les millores que sorgeixen de la pràctica.')]
      },
      E1: {
        title: 'Seguir el servei fins al resultat final',
        summary: 'Relacionar cada operació amb el resultat funcional, inclosos els passos que es completen més tard.',
        benefit: 'Entendre què rep l’usuari i quin tram explica el temps fins a la finalització.',
        whyPrincipal: 'Connecta la telemetria amb una operació concreta i un resultat validat pel responsable funcional.',
        relations: [s('A1','Els identificadors comuns permeten seguir l’operació entre components.'),s('A6','Les correspondències uneixen el recorregut tècnic amb el servei funcional.'),c('G2','Les sondes i l’experiència d’ús completen la lectura del resultat amb el recorregut de l’usuari.')]
      },
      E2: {
        title: 'Acordar objectius de fiabilitat del servei',
        summary: 'Indicadors i objectius compartits mostren el marge disponible i orienten les decisions de millora.',
        benefit: 'Prioritzar estabilitat i evolució amb un càlcul que els equips puguin revisar.',
        whyPrincipal: 'Els SLO i el pressupost d’error permeten començar amb un indicador i contrastar decisions sobre casos coneguts.',
        relations: [s('E1','El resultat funcional ajuda a definir què significa que el servei compleixi l’objectiu.'),s('B3','La qualitat de les dades permet interpretar el càlcul i reconèixer els períodes a revisar.')]
      },
      E3: {
        title: 'Relacionar el cost amb el servei prestat',
        summary: 'Unir consum, facturació i activitat per comparar opcions de millora i comprovar-ne l’efecte.',
        benefit: 'Decidir on optimitzar amb una visió conjunta de despesa, cobertura i rendiment.',
        relations: [c('A3','Les opcions de retenció ofereixen escenaris de cost i de consulta a comparar.'),s('A6','Els identificadors comuns permeten relacionar consum i servei.'),c('E1','L’activitat i el resultat funcional donen context al cost per operació.'),c('A5','En aplicacions compatibles, el perfilatge relaciona consum i funcions del codi.')]
      },
      E4: {
        title: 'Dedicar el temps recuperat a millorar',
        summary: 'Mesurar el treball repetitiu i l’estalvi net de les automatitzacions per acordar on reinvertir-lo.',
        benefit: 'Fer visible com l’eficiència es transforma en millores comprovables del servei.',
        relations: [c('D1','Les operacions automatitzades aporten execucions i temps que es poden comparar.'),c('B2','Les accions de cobertura ofereixen un destí concret per a la capacitat recuperada.'),c('E3','La lectura econòmica ajuda a distingir temps recuperat, consum i estalvi de factura.')]
      },
      F1: {
        title: 'Mantenir la llibertat de canviar d’eina',
        summary: 'Un assaig reconstrueix les funcions d’un servei en un destí alternatiu amb dades i configuracions transferibles.',
        benefit: 'Conèixer l’esforç i els elements que cal preparar per a una transició viable.',
        relations: [s('A1','Els esquemes i exemples descriuen les dades que s’han de poder interpretar al nou destí.'),s('A2','Un segon camí de recollida permet comparar els resultats entre eines.'),s('A4','Les configuracions versionades formen part del paquet que l’equip receptor pot reconstruir.')]
      },
      F2: {
        title: 'Compartir indicadors públics amb context',
        summary: 'Una cadena separada prepara dades agregades, les revisa i explica què representa cada indicador.',
        benefit: 'Fer útil la informació pública amb el detall i els controls adequats a cada ús.',
        relations: [s('A3','Les polítiques de retenció defineixen quins períodes i granularitats estan disponibles.'),s('B4','Les definicions comunes permeten publicar indicadors reproduïbles.'),s('F3','Els controls sobre camps, accessos i destins orienten la preparació de la publicació.')]
      },
      F3: {
        title: 'Decidir qui pot utilitzar cada dada',
        summary: 'Identitats, permisos i rutes autoritzades fan comprovable com circula i es consulta la telemetria.',
        benefit: 'Compartir la informació útil amb cada equip dins de l’àmbit que li correspon.',
        whyPrincipal: 'Acompanya qualsevol evolució de dades o IA i es pot validar amb fonts i perfils de prova.',
        relations: [s('A1','La definició dels senyals ajuda a classificar camps i aplicar el tractament acordat.'),c('A2','Les rutes de recollida incorporen els destins autoritzats i el filtratge previst.')]
      },
      G1: {
        title: 'Prioritzar la protecció segons el servei',
        summary: 'Relacionar actius, accessos i controls per valorar exposicions amb context operatiu.',
        benefit: 'Coordinar amb ciberseguretat les actuacions que més protegeixen els serveis.',
        relations: [s('B3','La qualitat i la vigència de les dades permeten situar la confiança en la lectura d’exposició.')]
      },
      G2: {
        title: 'Veure el servei com el viu l’usuari',
        summary: 'Sondes i recorreguts reals mostren l’experiència des de la seu fins al tràmit i la contrasten amb el SAU.',
        benefit: 'Distingir els trams que condicionen l’experiència i orientar la resposta dels equips.',
        whyPrincipal: 'La monitorització sintètica permet una prova concreta des de seu, Internet i entorn de destinació.',
        relations: [s('B3','Les comprovacions permeten valorar també la salut de la mateixa sonda.'),s('A6','El catàleg relaciona els passos del recorregut amb serveis i components.'),s('B7','Els resultats rellevants arriben a l’equip que pot atendre’ls.'),s('F3','Els comptes de prova, els permisos i la minimització delimiten les dades recollides.')]
      },
      G3: {
        title: 'Comunicar l’estat del servei amb claredat',
        summary: 'Una vista per component reuneix estat, historial i subscripcions amb un circuit de validació definit.',
        benefit: 'Oferir una informació coherent i útil a cada destinatari mentre evoluciona el cas.',
        relations: [s('B3','La qualitat de les fonts permet explicar amb quin suport es comunica cada estat.'),s('G2','Els recorreguts d’usuari aporten una comprovació funcional del servei.'),c('E2','Els objectius de fiabilitat ajuden a prioritzar la resposta i aporten context a l’evolució.')]
      }
    }
  };
})();
