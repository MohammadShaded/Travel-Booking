import { useState } from 'react';
import { FaBars, FaTimes, FaCity, FaHotel, FaBed } from 'react-icons/fa';
import type { City, AdminHotel, AdminRoom, EntityType } from '@/types';
import GenericDataGrid from './components/GenericDataGrid';
import GenericForm from './components/GenericForm';
import {
  cityGridConfig,
  cityFormConfig,
  hotelGridConfig,
  hotelFormConfig,
  roomGridConfig,
  roomFormConfig,
} from './components/entityConfigs';
import styles from './Admin.module.css';

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeEntity, setActiveEntity] = useState<EntityType>('cities');
  const [searchQuery, setSearchQuery] = useState('');
  const [formState, setFormState] = useState<{
    isOpen: boolean;
    item: City | AdminHotel | AdminRoom | null;
  }>({ isOpen: false, item: null });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleEntityChange = (entity: EntityType) => {
    setActiveEntity(entity);
    setSearchQuery('');
  };

  const openForm = (item?: City | AdminHotel | AdminRoom) => {
    setFormState({ isOpen: true, item: item || null });
  };

  const closeForm = () => {
    setFormState({ isOpen: false, item: null });
  };

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar Navigation */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>
            {isSidebarOpen && 'Admin Panel'}
          </h2>
          <button
            className={styles.toggleButton}
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className={styles.navigation}>
          <button
            className={`${styles.navItem} ${activeEntity === 'cities' ? styles.active : ''}`}
            onClick={() => handleEntityChange('cities')}
            title="Manage Cities"
          >
            <FaCity className={styles.navIcon} />
            {isSidebarOpen && <span>Manage Cities</span>}
          </button>

          <button
            className={`${styles.navItem} ${activeEntity === 'hotels' ? styles.active : ''}`}
            onClick={() => handleEntityChange('hotels')}
            title="Manage Hotels"
          >
            <FaHotel className={styles.navIcon} />
            {isSidebarOpen && <span>Manage Hotels</span>}
          </button>

          <button
            className={`${styles.navItem} ${activeEntity === 'rooms' ? styles.active : ''}`}
            onClick={() => handleEntityChange('rooms')}
            title="Manage Rooms"
          >
            <FaBed className={styles.navIcon} />
            {isSidebarOpen && <span>Manage Rooms</span>}
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Search Bar */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder={`Search ${activeEntity}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.gridContainer}>
          {activeEntity === 'cities' && (
            <GenericDataGrid
              config={cityGridConfig}
              searchQuery={searchQuery}
              onEdit={openForm}
              onCreate={() => openForm()}
            />
          )}
          {activeEntity === 'hotels' && (
            <GenericDataGrid
              config={hotelGridConfig}
              searchQuery={searchQuery}
              onEdit={openForm}
              onCreate={() => openForm()}
            />
          )}
          {activeEntity === 'rooms' && (
            <GenericDataGrid
              config={roomGridConfig}
              searchQuery={searchQuery}
              onEdit={openForm}
              onCreate={() => openForm()}
            />
          )}
        </div>
      </main>

      {activeEntity === 'cities' && (
        <GenericForm
          config={cityFormConfig}
          isOpen={formState.isOpen}
          onClose={closeForm}
          item={formState.item as City | null}
        />
      )}
      {activeEntity === 'hotels' && (
        <GenericForm
          config={hotelFormConfig}
          isOpen={formState.isOpen}
          onClose={closeForm}
          item={formState.item as AdminHotel | null}
        />
      )}
      {activeEntity === 'rooms' && (
        <GenericForm
          config={roomFormConfig}
          isOpen={formState.isOpen}
          onClose={closeForm}
          item={formState.item as AdminRoom | null}
        />
      )}
    </div>
  );
};

export default Admin;
