import type { DataGridConfig, FormConfig } from '@/types';
import type {
    City,
    CreateCityRequest,
    UpdateCityRequest,
} from '@/types';
import { getCities, createCity, updateCity, deleteCity } from '@/api/adminService';
import * as yup from 'yup';
import styles from './entityConfigs.module.css';

// City validation schema
const cityValidationSchema = yup.object({
    name: yup.string().required('City Name is required').min(2, 'City Name must be at least 2 characters'),
    country: yup.string().required('Country is required').min(2, 'Country must be at least 2 characters'),
    postOffice: yup.string().required('Post Office is required'),
    description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
});

// City DataGrid Configuration
export const cityGridConfig: DataGridConfig<City> = {
    entityName: 'City',
    entityNamePlural: 'Cities',
    queryKey: 'admin-cities',
    columns: [
        {
            key: 'id',
            label: 'ID',
        },
        {
            key: 'name',
            label: 'Name',
            className: styles.cityName,
        },
        {
            key: 'country',
            label: 'Country',
        },
        {
            key: 'postOffice',
            label: 'Post Office',
        },
        {
            key: 'numberOfHotels',
            label: '# Hotels',
        },
        {
            key: 'createdAt',
            label: 'Created',
            render: (city) => new Date(city.createdAt).toLocaleDateString(),
        },
        {
            key: 'updatedAt',
            label: 'Updated',
            render: (city) => new Date(city.updatedAt).toLocaleDateString(),
        },
        {
            key: 'actions',
            label: 'Actions',
        },
    ],
    fetchFn: (searchQuery) =>
        getCities(searchQuery ? { cityName: searchQuery } : undefined),
    deleteFn: deleteCity,
    getItemId: (city) => city.id,
};

// City Form Configuration
export const cityFormConfig: FormConfig<City, CreateCityRequest, UpdateCityRequest> = {
    entityName: 'City',
    queryKey: 'admin-cities',
    validationSchema: cityValidationSchema,
    fields: [
        {
            name: 'name' as keyof City,
            label: 'City Name',
            type: 'text',
            required: true,
            placeholder: 'Enter city name',
        },
        {
            name: 'country' as keyof City,
            label: 'Country',
            type: 'text',
            required: true,
            placeholder: 'Enter country',
        },
        {
            name: 'postOffice' as keyof City,
            label: 'Post Office',
            type: 'text',
            required: true,
            placeholder: 'Enter post office code',
        },
        {
            name: 'description' as keyof City,
            label: 'Description',
            type: 'textarea',
            required: true,
            placeholder: 'Enter city description',
            rows: 4,
        },
    ],
    createFn: createCity,
    updateFn: updateCity,
    getItemId: (city) => city.id,
    mapToCreateRequest: (formData) => ({
        name: (formData.name as string) || '',
        description: (formData.description as string) || '',
        country: (formData.country as string) || '',
        postOffice: (formData.postOffice as string) || '',
    }),
    mapToUpdateRequest: (formData) => ({
        name: (formData.name as string) || '',
        description: (formData.description as string) || '',
        country: (formData.country as string) || '',
        postOffice: (formData.postOffice as string) || '',
    }),
    mapFromItem: (city) => ({
        name: city.name,
        description: city.description,
        country: city.country,
        postOffice: city.postOffice,
    }),
};
