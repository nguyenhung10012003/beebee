'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRef } from 'react';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/AuthContext';

export default function NewTeamDialog({ refetch }: { refetch?: any }) {
  const teamName = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const members = useRef<HTMLInputElement>(null);
  const CREATE_TEAM = gql`
    mutation createTeam($createTeamInput: CreateTeamInput!) {
      createTeam(createTeamInput: $createTeamInput) {
        name, id, description
      }
    }
  `;
  const { user } = useAuth();

  const [createTeam, { data, loading, error }] = useMutation(CREATE_TEAM);

  const handleSubmit = async () => {
    if (!teamName.current || !teamName.current.value) {
      toast.info('Team name is required');
    } else {
      const membersArray = members.current?.value.split(',').map((email) => email.trim());
      const team = {
        name: teamName.current.value,
        leader: user.id,
        description: description.current?.value,
        members: membersArray,
      };
      try {
        await createTeam({ variables: { createTeamInput: team } });
        toast.success('Team created successfully');
        refetch();
      } catch (error) {
        console.log(error);
        toast.error('Failed to create team');
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-primary hover:bg-primaryHover">New team</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Bring everyone together with one team you can @mention, filter, and assign work to
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="">
            <Label htmlFor="teamname" className="text-right text-sm text-gray-500">
              Team Name
            </Label>
            <Input
              id="teamname"
              ref={teamName}
              className=""
              placeholder="Enter team name"
            />
          </div>
          <div className="">
            <Label htmlFor="description" className="text-right text-sm text-gray-500">
              Description
            </Label>
            <Textarea
              id="description"
              ref={description}
              className=""
              placeholder="Enter team description"
            />
          </div>
          <div className="">
            <Label htmlFor="members" className="text-right text-sm text-gray-500">
              Invite people to your team
            </Label>
            <Input
              id="members"
              ref={members}
              className=""
              placeholder={'Enter email addresses, separated by commas'}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" onClick={handleSubmit}>Create</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
