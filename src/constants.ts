

export class Contest {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    description: string;

    constructor({ id, title, startDate, endDate, description }: Contest) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }
}
