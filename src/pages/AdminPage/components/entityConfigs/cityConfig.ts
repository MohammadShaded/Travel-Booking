import type { DataGridConfig, FormConfig } from '@/types';
import type {
    City,
    CreateCityRequest,
    UpdateCityRequest,
} from '@/types';
import { getCities, createCity, updateCity, deleteCity } from '@/api/adminService';
import styles from './entityConfigs.module.css';

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
