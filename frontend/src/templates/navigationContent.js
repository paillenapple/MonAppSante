import { Briefcase, List, Search, FileText, Mail } from "react-feather";

const setNavContent = (status) => {
  if (status === "demandeur") {
    return [
      {
        url: "/userdesktop",
        label: "Mon espace personnel",
        icon: Briefcase,
      },
      {
        url: "/seeker/search-job",
        label: "Chercher un remplacement",
        icon: Search
      },
      {
        url: "/email",
        label: "Ma messagerie",
        icon: Mail
      },
    ]
  } else if (status === "recruteur") {
    return [
      {
        url: "/userdesktop",
        label: "Mon espace personnel",
        icon: Briefcase,
      },
      {
        url: "/recruiter/post",
        label: "Déposer une annonce",
        icon: FileText,
      },
      {
        url: "/email",
        label: "Ma messagerie",
        icon: Mail
      },
    ]
  }
}

export default setNavContent;