

export type ContestType = "marketing" | "referral";

export class Contest {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    description: string;
    type: ContestType;

    constructor({ id, title, startDate, endDate, description, type }: Contest) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.type = type;
    }
}
