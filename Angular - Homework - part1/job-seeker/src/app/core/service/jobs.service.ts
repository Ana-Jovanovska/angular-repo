import { computed, Injectable, signal } from '@angular/core';
import { Jobs } from '../../feature/models/jobs.model';
import { jobsMock } from '../../feature/jobs/jobs.mock';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  jobs = signal<Jobs[]>(jobsMock);
  selectedJobs = signal<Jobs[]>([]);

  jobsFillter = computed<Jobs[]>(() => {
    return this.jobs();
  });

  applyJob(id: string) {
    this.jobs.update((prev) =>
      prev.map((job) => {
        if (job.id === id) {
          job.isApplied = true;
          return job;
        } else {
          return job;
        }
      })
    );
    this.selectedJobs.set(this.jobs().filter((job) => job.isApplied));
  }

  cancelJob(id: string) {
    this.jobs.update((prev) =>
      prev.map((job) => {
        if (job.id === id) {
          job.isApplied = false;
          return job;
        } else {
          return job;
        }
      })
    );
    this.selectedJobs.set(this.jobs().filter((job) => job.isApplied));
  }

  onEditJobs(editJobsForm: Jobs) {
    this.jobs.update((prev) =>
      prev.map((job) => {
        if (job.id === editJobsForm.id) {
          return { ...editJobsForm };
        } else {
          return job;
        }
      })
    );
  }

  onAddJobs(job: Jobs) {
    this.jobs.update((prev) => [...prev, job]);
  }

  onGetById(id: string) {
    this.jobs().filter((job) => job.id === id);
  }
}
