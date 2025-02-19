import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const NewNoteDialog = ({noteTitle, setNoteTitle, createNewNote}) => {
  return (
    <Dialog>
        <DialogTrigger className="flex text-white gap-2 items-center text-sm px-2">
            <SquarePen className="cursor-pointer" size={16} color="#9b9a9b" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm bg-[#242229] border-[#504e53] text-white">
            <DialogHeader>
                <DialogTitle>New Note</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                        Title
                    </Label>
                    <Input
                        id="link"
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                    />
                </div>
            </div>
            <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                    <Button className="bg-[#5b5a5e] text-white px-3 py-0">
                        Cancel
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button onClick={createNewNote} className="bg-[#d1a928] text-black hover:text-white">
                        OK
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default NewNoteDialog