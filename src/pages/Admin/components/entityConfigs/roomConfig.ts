import type { DataGridConfig, FormConfig } from '@/types';
import type { AdminRoom, CreateRoomRequest, UpdateRoomRequest } from '@/types';
import { getRooms, createRoom, updateRoom, deleteRoom } from '@/api/adminService';
import * as yup from 'yup';
import styles from './entityConfigs.module.css';

// Room validation schema
const roomValidationSchema = yup.object({
    roomNumber: yup.number().required('Room Number is required').min(1, 'Must be greater than 0').integer('Must be a whole number'),
    roomType: yup.string().required('Room Type is required').min(3, 'Room Type must be at least 3 characters'),
    capacityOfAdults: yup.number().required('Adult Capacity is required').min(1, 'Must be at least 1').integer('Must be a whole number'),
    capacityOfChildren: yup.number().required('Child Capacity is required').min(0, 'Must be 0 or greater').integer('Must be a whole number'),
    price: yup.number().required('Price per Night is required').min(0, 'Must be 0 or greater'),
    availability: yup.mixed().required('Availability is required').oneOf(['true', 'false', true, false], 'Must select an availability option'),
});

export const roomGridConfig: DataGridConfig<AdminRoom> = {
    entityName: 'Room',
    entityNamePlural: 'Rooms',
    queryKey: 'admin-rooms',
    columns: [
        { key: 'roomId', label: 'ID' },
        { key: 'roomNumber', label: 'Number', className: styles.roomNumber },
        { key: 'roomType', label: 'Type' },
        { key: 'availability', label: 'Available', render: (r) => r.availability ? '✓' : '✗', className: styles.available },
        { key: 'capacityOfAdults', label: 'Adults' },
        { key: 'capacityOfChildren', label: 'Children' },
        { key: 'createdAt', label: 'Created', render: (r) => new Date(r.createdAt).toLocaleDateString() },
        { key: 'updatedAt', label: 'Updated', render: (r) => new Date(r.updatedAt).toLocaleDateString() },
        { key: 'actions', label: 'Actions' },
    ],
    fetchFn: (searchQuery) => getRooms(searchQuery ? { roomNumber: searchQuery } : undefined),
    deleteFn: deleteRoom,
    getItemId: (room) => room.roomId,
};

export const roomFormConfig: FormConfig<AdminRoom, CreateRoomRequest, UpdateRoomRequest> = {
    entityName: 'Room',
    queryKey: 'admin-rooms',
    validationSchema: roomValidationSchema,
    fields: [
        { name: 'roomNumber' as keyof AdminRoom, label: 'Room Number', type: 'number', required: true, placeholder: 'Enter room number' },
        { name: 'roomType' as keyof AdminRoom, label: 'Room Type', type: 'text', required: true, placeholder: 'e.g., Deluxe, Suite' },
        { name: 'capacityOfAdults' as keyof AdminRoom, label: 'Adult Capacity', type: 'number', required: true, placeholder: 'Number of adults' },
        { name: 'capacityOfChildren' as keyof AdminRoom, label: 'Child Capacity', type: 'number', required: true, placeholder: 'Number of children' },
        { name: 'price' as keyof AdminRoom, label: 'Price per Night', type: 'number', required: true, placeholder: 'Price in USD' },
        { name: 'availability' as keyof AdminRoom, label: 'Available', type: 'select', required: true, options: [{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }] },
    ],
    createFn: createRoom,
    updateFn: updateRoom,
    getItemId: (room) => room.roomId,
    mapToCreateRequest: (d) => ({
        roomNumber: Number(d.roomNumber) || 0,
        roomPhotoUrl: '',
        roomType: (d.roomType as string) || '',
        capacityOfAdults: Number(d.capacityOfAdults) || 0,
        capacityOfChildren: Number(d.capacityOfChildren) || 0,
        amenities: [],
        price: Number(d.price) || 0,
        availability: String(d.availability) === 'true' || d.availability === true,
    }),
    mapToUpdateRequest: (d) => ({
        roomNumber: Number(d.roomNumber) || 0,
        roomType: (d.roomType as string) || '',
        price: Number(d.price) || 0,
        availability: String(d.availability) === 'true' || d.availability === true,
    }),
    mapFromItem: (r) => ({
        roomNumber: r.roomNumber,
        roomType: r.roomType,
        capacityOfAdults: r.capacityOfAdults,
        capacityOfChildren: r.capacityOfChildren,
        price: r.price,
        availability: r.availability,
    }),
};
