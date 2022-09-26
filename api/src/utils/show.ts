import { Seat, Slot, SpecificShowResponse } from 'controllers/types';
import { Location, Reservation, Show } from '../models';
import { ApiError } from './ApiError';

export const getShowsUtil = async ({
  date,
  locationId,
}: {
  date: string;
  locationId: number;
}) => {
  try {
    const shows = await Show.find({
      where: { locationId, startDate: date },
      order: { startSlot: 'ASC' },
      select: ['id', 'startDate', 'startSlot', 'isActive', 'location', 'movie'],
      relations: ['movie', 'location'],
    });
    return shows;
  } catch (err: any) {
    throw new ApiError(err.statusCode ?? 500, err.message);
  }
};

export const getShowUtil = async ({ id }: { id: number }) => {
  try {
    const show = await Show.findOne({
      where: { id },
      select: ['id', 'startDate', 'startSlot', 'isActive', 'location', 'movie'],
      relations: ['movie', 'location'],
    });

    if (!show) throw new ApiError(400, 'Show not found');
    const temp = { ...show.location };
    const resShow: SpecificShowResponse = {
      ...show,
      location: { ...temp, seatDetail: [] },
    };

    const seats = await getReservations({ show });
    resShow.location.seatDetail = seats;

    return resShow;
  } catch (err: any) {
    throw new ApiError(err.statusCode ?? 500, err.message);
  }
};

export const getReservations = async ({ show }: { show: Show }) => {
  try {
    // console.log('show is');
    // console.log(show);
    const reservations = await Reservation.find({
      where: { showId: show.id },
      select: ['seatId', 'show'],
      relations: ['show'],
    });

    const location = await Location.findOne({ where: { id: show.locationId } });
    if (!location) throw new ApiError(400, 'Location of show not found');

    // console.log('location is');
    // console.log(location);

    const seats: Seat[] = [];
    for (let i = 0; i < show.location.seat; i++)
      seats.push({ isReserved: false, id: i + 1 });

    for (const reservation of reservations) {
      seats[reservation.seatId - 1].isReserved = true;
    }
    return seats;
  } catch (err: any) {
    throw new ApiError(err.statusCode ?? 500, err.message);
  }
};

export const getSlots = async ({
  startDate,
  locationId,
}: {
  startDate: string;
  locationId: number;
}) => {
  try {
    const slots: Slot[] = [];
    for (let i = 0; i < 20; i++) slots.push({ isReserved: false, id: i + 1 });

    const shows = await Show.find({
      where: { startDate, locationId },
      select: ['movie', 'startSlot'],
      relations: ['movie'],
    });
    for (let show of shows) {
      const e = show.startSlot + show.movie.length - 1;
      for (let i = show.startSlot - 1; i < e; i++) {
        slots[i].isReserved = true;
      }
    }
    return slots;
  } catch (err: any) {
    throw new ApiError(err.statusCode ?? 500, err.message);
  }
};

export const getAvailableSeats = async ({ showId }: { showId: number }) => {
  try {
    const show = await Show.findOne({ where: { id: showId } });
    if (!show) throw new ApiError(400, 'Show not found');
  } catch (err: any) {
    throw new ApiError(err.statusCode ?? 500, err.message);
  }
};
