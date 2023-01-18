using MediatR;

namespace PolicyManager.Core.Domain
{
    public interface IDomainEvent: INotification
    {
        Guid Id { get; }

        DateTime OccurredOn { get; }
    }
}
