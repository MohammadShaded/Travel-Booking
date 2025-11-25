import React from 'react';
import RoomCard from './components/RoomCard';
import type { Room } from '@/types';
import styles from './RoomList.module.css';

interface RoomListProps {
  rooms: Room[];
  onBookRoom: (roomId: number) => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, onBookRoom }) => {
  if (!rooms || rooms.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3 className={styles.emptyTitle}>No rooms available</h3>
        <p className={styles.emptyText}>
          Please try different dates or contact the hotel directly.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.roomListContainer}>
      <h2 className={styles.sectionTitle}>Available Rooms</h2>
      <div className={styles.roomsList}>
        {rooms.map((room) => (
          <RoomCard
            key={room.roomId}
            room={room}
            onBookRoom={onBookRoom}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomList;
