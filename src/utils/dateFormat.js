const DateOnlyConfig = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
};

const DateTimeConfig = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // For AM/PM format
};

const TimeConfig = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // For AM/PM format
};

// i/p - 2025-02-14T08:40:27.000Z , o/p - February 14, 2025

export const formattedDateOnly = datetime =>
    datetime.toLocaleString('en-US', DateOnlyConfig);

// i/p - 2025-02-14T08:40:27.000Z , o/p - February 14, 2025 at 2:10 PM
export const formattedDateTime = datetime =>
    datetime.toLocaleString('en-US', DateTimeConfig);

export const formattedTime = datetime =>
    datetime.toLocaleString('en-US', TimeConfig);

// "YYYY-MM-DD" (e.g., "2024-10-27") to "27 October 2024".
export const formattedTimetoText = datetime => {
    const date = new Date(datetime);
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};
