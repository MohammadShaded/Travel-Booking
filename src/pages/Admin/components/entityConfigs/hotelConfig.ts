import type { DataGridConfig, FormConfig } from '@/types';
import type { AdminHotel, CreateHotelRequest, UpdateHotelRequest } from '@/types';
import { getHotels, createHotel, updateHotel, deleteHotel } from '@/api/adminService';
import * as yup from 'yup';
import styles from './entityConfigs.module.css';

// Hotel validation schema
const hotelValidationSchema = yup.object({
    hotelName: yup.string().required('Hotel Name is required').min(3, 'Hotel Name must be at least 3 characters'),
    owner: yup.string().required('Owner is required').min(2, 'Owner must be at least 2 characters'),
    location: yup.string().required('Location is required'),
    description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
    starRating: yup.number().required('Star Rating is required').min(1, 'Must be 1-5').max(5, 'Must be 1-5'),
    availableRooms: yup.number().required('Available Rooms is required').min(0, 'Must be 0 or greater').integer('Must be a whole number'),
});

export const hotelGridConfig: DataGridConfig<AdminHotel> = {
    entityName: 'Hotel',
    entityNamePlural: 'Hotels',
    queryKey: 'admin-hotels',
    columns: [
        { key: 'id', label: 'ID' },
        { key: 'hotelName', label: 'Name', className: styles.hotelName },
        { key: 'starRating', label: 'Stars', className: styles.starRating, render: (h) => `⭐ ${h.starRating}` },
        { key: 'owner', label: 'Owner' },
        { key: 'availableRooms', label: 'Rooms' },
        { key: 'createdAt', label: 'Created', render: (h) => new Date(h.createdAt).toLocaleDateString() },
        { key: 'updatedAt', label: 'Updated', render: (h) => new Date(h.updatedAt).toLocaleDateString() },
        { key: 'actions', label: 'Actions' },
    ],
    fetchFn: (searchQuery) => getHotels(searchQuery ? { searchQuery } : undefined),
    deleteFn: deleteHotel,
    getItemId: (hotel) => hotel.id,
};

export const hotelFormConfig: FormConfig<AdminHotel, CreateHotelRequest, UpdateHotelRequest> = {
    entityName: 'Hotel',
    queryKey: 'admin-hotels',
    validationSchema: hotelValidationSchema,
    fields: [
        { name: 'hotelName' as keyof AdminHotel, label: 'Hotel Name', type: 'text', required: true, placeholder: 'Enter hotel name' },
        { name: 'owner' as keyof AdminHotel, label: 'Owner', type: 'text', required: true, placeholder: 'Enter owner name' },
        { name: 'location' as keyof AdminHotel, label: 'Location', type: 'text', required: true, placeholder: 'Enter location' },
        { name: 'description' as keyof AdminHotel, label: 'Description', type: 'textarea', required: true, placeholder: 'Enter description', rows: 4 },
        { name: 'starRating' as keyof AdminHotel, label: 'Star Rating', type: 'number', required: true, placeholder: '1-5' },
        { name: 'availableRooms' as keyof AdminHotel, label: 'Available Rooms', type: 'number', required: true, placeholder: 'Number of rooms' },
    ],
    createFn: createHotel,
    updateFn: updateHotel,
    getItemId: (hotel) => hotel.id,
    mapToCreateRequest: (d) => ({
        hotelName: (d.hotelName as string) || '',
        owner: (d.owner as string) || '',
        location: (d.location as string) || '',
        description: (d.description as string) || '',
        hotelType: 'Standard',
        starRating: Number(d.starRating) || 0,
        latitude: 0,
        longitude: 0,
        imageUrl: '',
        availableRooms: Number(d.availableRooms) || 0,
        rooms: [],
    }),
    mapToUpdateRequest: (d) => ({
        hotelName: (d.hotelName as string) || '',
        owner: (d.owner as string) || '',
        location: (d.location as string) || '',
        description: (d.description as string) || '',
        starRating: Number(d.starRating) || 0,
        availableRooms: Number(d.availableRooms) || 0,
    }),
    mapFromItem: (h) => ({
        hotelName: h.hotelName,
        owner: h.owner,
        location: h.location,
        description: h.description,
        starRating: h.starRating,
        availableRooms: h.availableRooms,
    }),
};
