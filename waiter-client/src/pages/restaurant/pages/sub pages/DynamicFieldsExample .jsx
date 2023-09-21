import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

const DynamicFieldsExample = ({ onValueChange }) => {
    const [amount, setAmount] = useState('');
    const [fields, setFields] = useState([]);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleGenerateFields = () => {
        const numFields = parseInt(amount, 10);
        if (!isNaN(numFields) && numFields > 0) {
            const newFields = Array.from({ length: numFields }, (_, index) => ({
                tableName: '',
                charCount: '',
                images: [],
            }));
            setFields(newFields);
        }
    };

    const handleFieldChange = (index, field, value) => {
        const updatedFields = [...fields];
        updatedFields[index][field] = value;
        setFields(updatedFields);

        
        onValueChange(fields);
    };

    const handleAddImage = (index) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.addEventListener('change', (e) => {
            handleFieldChange(index, 'images', Array.from(e.target.files));
        });
        input.click();
    };
// console.log(fields);
    return (
        <div>
            <Stack direction="row" mb={2}>
                <TextField
                    fullWidth
                    label="Enter the amount"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    sx={{ marginRight: 2 }}
                />
                <Button onClick={handleGenerateFields} variant="contained" color="primary">
                    Add
                </Button>
            </Stack>
            <div>
                {fields.map((field, index) => (
                    <div key={index}>
                        <TextField
                            fullWidth
                            label="Table Name"
                            value={field.tableName}
                            onChange={(e) => handleFieldChange(index, 'tableName', e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Char Count"
                            value={field.charCount}
                            onChange={(e) => handleFieldChange(index, 'charCount', e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Stack direction="column" alignItems="center">
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {field.images.map((image, imageIndex) => (
                                    <img
                                        key={imageIndex}
                                        src={URL.createObjectURL(image)}
                                        alt={` ${imageIndex}`}
                                        style={{ width: '100px', height: '100px', margin: '10px' }}
                                    />
                                ))}
                            </div>
                        <Button onClick={() => handleAddImage(index)} variant="contained" color="primary" sx={{ mb:2}}>
                                Add Image
                            </Button>
                        </Stack>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DynamicFieldsExample;
