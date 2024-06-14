"use client";

import { Booked } from "@/booked.t";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  bookParkingAllot,
  cancelParking,
} from "@/features/bookedSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/hooks/hooks";
import { useState } from "react";

type Props = {
  park: number;
};

const admin = true;

const myParkNo = 3;

function Park({ park }: Props) {
  const isParkSelectable = !admin && park === myParkNo;
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const bookedAllocation = useAppSelector(
    (state) => state.book.booked,
  );
  const dispatch = useAppDispatch();
  //   console.log(bookedAllocation);

  const isParkBooked = bookedAllocation.findIndex(
    (booked: Booked) => booked.parkingNo === park,
  );

  //   console.log(isParkBooked);

  const handleParkingAllot = () => {
    // ADMIN
    if (admin) {
      if (isParkBooked < 0) {
        dispatch(
          bookParkingAllot({
            parkingNo: park,
            name: input,
          }),
        );
      } else {
        dispatch(cancelParking(isParkBooked));
      }
      setOpen(false);
      return;
    }

    if (!isParkSelectable) return;

    if (isParkBooked < 0) {
      dispatch(
        bookParkingAllot({
          parkingNo: park,
          name: input,
        }),
      );
    } else {
      dispatch(cancelParking(isParkBooked));
    }

    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
        <div
          className={`flex items-center justify-center w-12 h-12 border ${
            !admin && "bg-gray-300"
          } ${isParkSelectable && "bg-white"} ${
            isParkBooked > -1
              ? "border-green-400"
              : "border-black"
          } cursor-pointer`}
        >
          {park}
        </div>
        {/* <div>{park}</div> */}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Parking Allot</DialogTitle>
          <DialogDescription>
            Book the parking allot for your colleague. Click
            book when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label
              htmlFor='name'
              className='text-right'
            >
              Parking No
            </Label>
            <Input
              id='name'
              defaultValue={park}
              disabled
              type='number'
              className='col-span-3 disabled:text-gray-800'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label
              htmlFor='username'
              className='text-right'
            >
              Colleague
            </Label>
            <Input
              id='username'
              value={input}
              disabled={isParkBooked > -1 && true}
              onChange={(e) => setInput(e.target.value)}
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleParkingAllot}
            type='submit'
          >
            {isParkBooked > -1 ? "Cancel" : "Book"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Park;
