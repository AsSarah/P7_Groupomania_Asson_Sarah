import "./sidebar.css";
import {
  RssFeed,
  Chat,
  
  Event,
} from "@material-ui/icons";


export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Fil d'actualite</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Evenements</span>
          </li>
        </ul>
        <hr className="sidebarHr" />  {/* creation de la barre en dessous de la liste d'icones */}

      </div>
    </div>
  );
}

