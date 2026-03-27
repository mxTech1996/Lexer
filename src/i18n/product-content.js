const productTranslationsEs = {
  484: {
    name: "Diagnostico Empresarial Integral",
    description:
      "Servicio de analisis completo para evaluar fortalezas, debilidades, oportunidades y riesgos del negocio, con enfoque en eficiencia y rentabilidad.",
    content:
      "Evaluacion integral,Analisis de operaciones,Analisis basado en datos,Benchmarking,Alcance adaptable,Analisis FODA,Revision de salud financiera,Eficiencia operativa,Evaluacion de riesgos",
  },
  485: {
    name: "Estrategia de Entrada a Mercado",
    description:
      "Plan estrategico para introducir productos o servicios en nuevos mercados, considerando competencia, regulaciones y contexto cultural.",
    content:
      "Investigacion y analisis de mercado,Analisis competitivo,Cumplimiento regulatorio,Evaluacion de riesgos,Estrategia de posicionamiento,Plan de marketing adaptado",
  },
  486: {
    name: "Marco de Gestion de Riesgos",
    description:
      "Metodologia estructurada para identificar, evaluar, tratar y monitorear riesgos de forma alineada con objetivos y cumplimiento normativo.",
    content:
      "Proceso estructurado,Identificacion y tratamiento de riesgos,Marco personalizable,Aplicable a multiples industrias,Cumplimiento de estandares y regulaciones",
  },
  487: {
    name: "Hoja de Ruta de Transformacion Digital",
    description:
      "Plan paso a paso para adoptar tecnologias digitales e integrarlas en procesos, operaciones y cultura organizacional.",
    content:
      "Estrategia integral,Diagnostico del estado actual,Analisis de capacidades digitales,Definicion de objetivos,Plan por etapas",
  },
  488: {
    name: "Programa de Mejora de Experiencia del Cliente",
    description:
      "Iniciativa para mejorar la percepcion e interaccion de los clientes con la marca, aumentando satisfaccion, lealtad y recomendacion.",
    content:
      "Enfoque centrado en el cliente,Mapeo del customer journey,Identificacion de puntos de dolor,Canales de retroalimentacion continua",
  },
  489: {
    name: "Analisis de Desempeno Financiero",
    description:
      "Evaluacion integral de la salud financiera para medir resultados, detectar tendencias y mejorar la toma de decisiones.",
    content:
      "Revision financiera detallada,Analisis de estados financieros,Analisis de razones financieras,Analisis de tendencias",
  },
  490: {
    name: "Plan de Compromiso y Retencion de Talento",
    description:
      "Estrategias para incrementar satisfaccion y retencion mediante desarrollo profesional, retroalimentacion y cultura organizacional.",
    content:
      "Sistemas de feedback integral,Oportunidades de desarrollo,Programas de reconocimiento y recompensas",
  },
  491: {
    name: "Consultoria en Sostenibilidad y ESG",
    description:
      "Servicio para implementar practicas sostenibles alineadas con criterios ambientales, sociales y de gobernanza.",
    content:
      "Analisis de huella de carbono,Sostenibilidad en cadena de suministro,Estrategia ESG,Relacion con stakeholders",
  },
  492: {
    name: "Consulta Rapida Adicional",
    description:
      "Llamada de seguimiento de 15 minutos para aclarar siguientes pasos y resolver dudas puntuales.",
    content:
      "Llamada de 15 minutos,Siguientes pasos accionables,Ideal para aclaraciones rapidas",
  },
  493: {
    name: "Revision Extra de Documento",
    description:
      "Revision de un documento adicional (hasta 10 paginas) con recomendaciones concretas de mejora.",
    content: "1 documento extra,Hasta 10 paginas,Retroalimentacion escrita concisa",
  },
  494: {
    name: "Soporte Prioritario por Correo",
    description:
      "Respuestas prioritarias por correo durante 7 dias para acelerar avances del proyecto.",
    content: "Respuestas prioritarias,Cobertura por 7 dias,Canal unico: correo",
  },
  495: {
    name: "Paquete de Plantillas",
    description:
      "Plantillas descargables para acelerar planeacion y reporteo: agendas, planes de accion y estatus.",
    content: "Agendas,Planes de accion,Plantillas de actualizacion de estatus",
  },
  496: {
    name: "Resumen Ejecutivo (1 pagina)",
    description:
      "Resumen breve de hallazgos clave y recomendaciones para compartir con direccion.",
    content: "Resumen de 1 pagina,Hallazgos clave,Principales recomendaciones",
  },
  497: {
    name: "Taller de Optimizacion de Procesos",
    description:
      "Taller de medio dia para detectar cuellos de botella y definir mejoras practicas en los flujos de trabajo.",
    content:
      "Sesion interactiva de medio dia,Mapeo de flujos,Identificacion de cuellos de botella,Plan de eficiencia accionable",
  },
  498: {
    name: "Evaluacion de Habilidades de Liderazgo",
    description:
      "Evaluacion profunda de capacidades de liderazgo con reporte personalizado de fortalezas y oportunidades.",
    content:
      "Evaluacion conductual online,Revision de feedback 360,Sesion de devolucion de 1 hora,Reporte de desarrollo personalizado",
  },
  499: {
    name: "Brief de Investigacion de Mercado",
    description:
      "Reporte sintetico con tendencias, movimientos de competidores y oportunidades del sector para decisiones estrategicas.",
    content:
      "Panorama competitivo,Analisis de tendencias,Insights del publico objetivo,Recomendaciones estrategicas",
  },
  500: {
    name: "Revision de Salud Financiera",
    description:
      "Revision ejecutiva de estados financieros recientes para detectar ahorros inmediatos y evaluar estabilidad fiscal.",
    content:
      "Revision de estados recientes,Analisis de gastos,Evaluacion de flujo de caja,Resumen ejecutivo de hallazgos",
  },
  501: {
    name: "Encuesta de Alineacion Cultural",
    description:
      "Encuesta organizacional para medir alineacion con valores y mision, identificando oportunidades de mejora cultural.",
    content:
      "Encuesta online personalizada,Respuestas anonimas,Analisis de datos,Presentacion de hallazgos clave",
  },
};

export const getLocalizedProducts = (lang, products) => {
  if (lang !== "es") return products;

  return products.map((product) => {
    const translation = productTranslationsEs[product.id];
    if (!translation) return product;

    return {
      ...product,
      name: translation.name,
      description: translation.description,
      content: translation.content,
    };
  });
};
