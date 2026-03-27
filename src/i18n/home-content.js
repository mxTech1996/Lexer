const homeContentEs = {
  subtitle: "Impulsamos el exito empresarial con consultoria estrategica",
  description:
    "Nuestros consultores brindan soluciones personalizadas para mejorar el rendimiento, optimizar operaciones y lograr crecimiento sostenible. Nos especializamos en desarrollo organizacional, mejora de procesos, gestion del cambio y planeacion estrategica.",
  info: [
    {
      title: "Vision",
      description:
        "Ser la firma consultora lider que impulsa a las organizaciones a alcanzar la excelencia mediante soluciones innovadoras y una vision estrategica clara.",
    },
    {
      title: "Mision",
      description:
        "Brindar servicios de consultoria a la medida que mejoren la eficiencia operativa, impulsen el crecimiento y fomenten el desarrollo sostenible de nuestros clientes.",
    },
    {
      title: "Valores",
      description:
        "Integridad, Innovacion, Colaboracion y Excelencia en cada interaccion y proyecto.",
    },
  ],
  services: [
    {
      title: "Planeacion estrategica",
      description:
        "Ayudamos a desarrollar planes estrategicos integrales alineados con metas de largo plazo para asegurar crecimiento y ventaja competitiva.",
    },
    {
      title: "Mejora de eficiencia operativa",
      description:
        "Analizamos operaciones para detectar oportunidades de mejora, reducir costos y elevar la productividad.",
    },
    {
      title: "Gestion del cambio",
      description:
        "Acompanamos iniciativas de cambio organizacional para lograr transiciones ordenadas y menor resistencia interna.",
    },
    {
      title: "Sistemas de gestion del desempeno",
      description:
        "Disenamos marcos de desempeno que alinean objetivos individuales y de equipo con metas del negocio.",
    },
    {
      title: "Desarrollo y coaching de liderazgo",
      description:
        "Programas de liderazgo y sesiones de coaching para fortalecer habilidades directivas y cultura organizacional.",
    },
  ],
  references: [
    {
      name: "John Duarte, CEO de Tech Innovations",
      description:
        "Trabajar con esta firma transformo nuestro negocio. Sus recomendaciones estrategicas nos ayudaron a crecer.",
    },
    {
      name: "Emily Ruiz, Gerente de Operaciones en Green Solutions",
      description:
        "El proyecto de eficiencia operativa fue decisivo. Vimos resultados inmediatos en costos y productividad.",
    },
    {
      name: "Michael T., Director de RH en Creative Agency",
      description:
        "El soporte en gestion del cambio fue sobresaliente y facilito una transicion organizacional compleja.",
    },
    {
      name: "Sarah P., CFO de Retail Success",
      description:
        "El sistema de desempeno implementado mejoro notablemente la rendicion de cuentas y resultados.",
    },
    {
      name: "David L., Fundador",
      description:
        "El programa de liderazgo fue exactamente lo que necesitabamos para profesionalizar a nuestros lideres.",
    },
  ],
};

export const getHomeDataByLanguage = (lang, dataSite) => {
  if (lang !== "es") {
    return {
      subtitle: dataSite.subtitle,
      description: dataSite.description,
      info: dataSite.info,
      services: dataSite.services,
      references: dataSite.references,
    };
  }

  return {
    subtitle: homeContentEs.subtitle,
    description: homeContentEs.description,
    info: dataSite.info.map((item, index) => ({
      ...item,
      ...homeContentEs.info[index],
    })),
    services: dataSite.services.map((item, index) => ({
      ...item,
      ...homeContentEs.services[index],
    })),
    references: dataSite.references.map((item, index) => ({
      ...item,
      ...homeContentEs.references[index],
    })),
  };
};
